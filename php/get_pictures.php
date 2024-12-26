<?php 
require __DIR__ . '/pics_folders_array.php';

if(isset($_GET['get_data'])){
    $pictures_array = [];
    $pictures_dir = "../pics/"; 
    $picsFoldersArray = get_pics_folders_array();

    foreach ($picsFoldersArray as $key => $value) {
        $fileinfos = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($pictures_dir.$picsFoldersArray[$key])
        );
        foreach($fileinfos as $pathname => $fileinfo) {
            if (!$fileinfo->isFile()) continue;
            $pictures_array[] = substr(str_replace('\\', '/', substr($pathname, 2, strlen($pathname))) ,1);
        }
    };
    echo json_encode($pictures_array);
}
?>