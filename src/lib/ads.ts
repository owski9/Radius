export function initAds() {
    // btw owski I highly recommend setting the client ids n shit in a ENV file. I can set one up for you if you want.
    // Change this to your adsense client ID, It should tell you.
    const adClient = 'YOUR_AD_CLIENT_ID';
    function initializeAds() {
        // Change this to the adsense "unit" ID or whatever its called. lmk I can prob help point things out
        let adSlot = 'YOUR_AD_SLOT_ID';
        (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: adClient,
            enable_page_level_ads: true
        });
    }
}

export function run() {
    const elm = document.createElement("script")
    elm.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    document.appendChild(elm)
}