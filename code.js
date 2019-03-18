$(document).ready(function () {
    console.log("ready");

    let filter = `Fox Business,Fox News,The Daily Show with Trevor Noah,Washington Post,CBS News,CNN,MSNBC,TODAY,The Late Show with Stephen Colbert,NBC News,Full Frontal with Samantha Bee,Bloomberg Technology,Bloomberg Politics,CBS This Morning,ABC News,USA Today,Fox News Insider`;

    $(".subbtn").click(function () {
        let searchTerm = $(".searchterm").val();
        let filters = filter.split(",");
        // console.log(filters);
        getSearch(searchTerm, filters);
    })

    $(document).on("click", ".nextbtn", function () {
        let searchTerm = $(".searchterm").val();
        let filters = filter.split(",");
        let npgtoken = $(".nextbtn").attr("npg");
        // console.log("next page token: " + npgtoken);
        getSearch(searchTerm, filters, npgtoken);
    })
})

function getSearch(q, f, npgtoken) {
    let req = "https://www.googleapis.com/youtube/v3/search?", part = "snippet", maxResults = "20", key = "AIzaSyC2GKXqi8j2xa0eod6HsqY4MYwy6YinS5s", request = "";
    if (npgtoken) {
        request = req + "&part=" + part + "&q=" + q + "&maxResults=" + maxResults + "&key=" + key + "&pageToken=" + npgtoken;
    }
    else {
        request = req + "&part=" + part + "&q=" + q + "&maxResults=" + maxResults + "&key=" + key;
    }
    $(".videoSpace").html("");
    $.get(request, function (data) {
        console.log(data)
        let nextPageToken = data.nextPageToken;        
        for (let i = 0; i < data.items.length; i++) {
            item = data.items[i];
            channel = item.snippet.channelTitle;
            if (!f.includes(channel)) {
                // console.log(channel);
                genVideo(item.id.videoId, channel, item.snippet.title);
            }
        }
        $(".videoSpace").append(`<button npg=${nextPageToken} type="button" class="nextbtn">Next Page</button>`);
    })
}



function genVideo(vidId, channel, title) {
    $(".videoSpace").append(`
        <div class="vidBox">
            <div>Channel: ${channel}</div>
            <div>Title: ${title}</div>
            <iframe class="video video-${vidId}" src="https://www.youtube.com/embed/${vidId}" width="640" height="360" frameborder="0" allowfullscreen></iframe>            
        </div>
    `);
}