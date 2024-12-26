function carousel(){
    carousel_in_div = document.getElementsByClassName("carousel_in")[0]
    request_url = "php/get_pictures.php"
    count_pics_insert = 10
    pictures_arr_key = 0
    deleted_pictures_count = 0
    /********** Get pics URLS **********/
    var xhr = new XMLHttpRequest()

    xhr.open('GET', request_url+"?get_data=1")
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState !== 4) return

        /********** Request result **********/
        if (xhr.status === 200){                                // Request OK            
            var pictures_urls = JSON.parse(xhr.responseText)
            shuffle(pictures_urls);
            for(let i=0; i<count_pics_insert*2; i++){
                let pic = document.createElement("img")
                pic.src = pictures_urls[pictures_arr_key++]
                carousel_in_div.append(pic)
            }

            var carousel_anim = setInterval(function(){
                var first_pic =  $( ".carousel_in" ).children(":first")
                first_pic.width(first_pic.width()-1)
                if(first_pic.width() < 1){
                    first_pic.remove()
                    console.log("Remove pic: "+pictures_urls[pictures_arr_key+(deleted_pictures_count++)])
                } 
                if(deleted_pictures_count == count_pics_insert){
                    console.log("Pictures deleted_pictures_counteted: "+(pictures_arr_key+deleted_pictures_count))
                    pictures_arr_key = addFirstTenPics(pictures_arr_key, carousel_in_div, count_pics_insert, site_folder, pictures_urls)
                    deleted_pictures_count = 0
                }
            }, 30);
        }else                                                   // Request ERROR
            console.warn('ERROR');   

    };
    /********** Request result **********/

    xhr.send(null);
    /********** * Get pics URLS(END) **********/
};

function addFirstTenPics(pictures_arr_key, carousel_in_div, count_pics_insert, site_folder, pictures_urls){
    for(let i=0; i<count_pics_insert; i++){
        let pic = document.createElement("img")
        pic.src = site_folder+pictures_urls[pictures_arr_key++]
        carousel_in_div.append(pic)
    }
    return pictures_arr_key
}
function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }