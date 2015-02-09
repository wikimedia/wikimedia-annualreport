
// These values are updated every 5 minutes
// using site_stats table from all wikis replicated in
// WMF Labs databases.
// Families updated include ["wikibooks", "wikipedia", "wiktionary", "wikimedia", "wikiquote", "wikisource", "wikinews", "wikiversity", "commons", "wikispecies", "wikidata", "wikivoyage"]
// More questions? emijrp AT gmail DOT com
    
var timenow = new Date().getTime();
var period = 100; // period update in miliseconds
var editnow = editinit + ((timenow-timeinit)/1000) * editrate;
var spliter = ",";
var spliter_r = new RegExp(/(^|\s)(\d+)(\d{3})/);

function init() {
    adjustSizes();

    var lang = "";
    var header = "";
    var donate = "";
    var f11 = "";
    var author = "";
    if (navigator.systemLanguage) {
        lang = navigator.systemLanguage;
    }else if (navigator.userLanguage) {
        lang = navigator.userLanguage;
    }else if(navigator.language) {
        lang = navigator.language;
    }else {
        lang = "en";
    }

    if (lang.length>2) { lang=lang.substring(0,2); }

    switch(lang){
        case "example":
            header='<a href="http://www.wikimedia.org"></a>:';
            spliter='&nbsp;';
            donate='<a href="http://wikimediafoundation.org/wiki/Support_Wikipedia"></a>';
            f11='';
            author='<a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (<a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "af":
            header='Totale wysigings in alle <a href="http://www.wikimedia.org">Wikimedia-projekte</a>:';
            spliter='&nbsp;';
            donate="<a href='http://wikimediafoundation.org/wiki/Skenk'>Skenk 'n donasie aan die Wikimedia-stigting</a>"; //be careful with 'n
            f11='Druk op F11 vir volskerm';
            author='Ontwikkel deur <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (inspirasie deur <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "als":
            header='Gsamtaazahl Bearbeitige uff de <a href="http://www.wikimedia.org">Wikimedia-BrojÃ¤kt:</a>';
            spliter='&nbsp;';
            donate="<a href='http://wikimediafoundation.org/wiki/Finanzielli_Hilf'>UnderstÃ¼tz d'Wikimedia Foundation</a>"; //be careful with d'
            f11='Vollbild: F11';
            author='Gschribe vum <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (uff Basis vu <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "ar":
            header='Ù…Ø¬Ù…ÙˆØ¹ Ø§Ù„ØªØ¹Ø¯ÙŠÙ„Ø§Øª ÙÙŠ <a href="http://www.wikimedia.org">Ù…Ø´Ø§Ø±ÙŠØ¹ ÙˆÙŠÙƒÙŠÙ…ÙŠØ¯ÙŠØ§</a>:';
            spliter=',';
            donate='<a href="http://wikimediafoundation.org/wiki/Ø¬Ù…Ø¹_ØªØ¨Ø±Ø¹Ø§Øª">ØªØ¨Ø±Ø¹ Ù„Ù…Ø¤Ø³Ø³Ø© ÙˆÙŠÙƒÙŠÙ…ÙŠØ¯ÙŠØ§</a>';
            f11='Ù„Ù„Ø´Ø§Ø´Ø© Ø§Ù„ÙƒØ§Ù…Ù„Ø© Ø§Ø¶ØºØ· F11';
            author='Ù…Ù† ØªØ·ÙˆÙŠØ± <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (Ù…Ù„Ù‡Ù…Ø© Ù…Ù† <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "az":
            header='<a href="http://www.wikimedia.org">Wikimedia layihÉ™sindÉ™ </a> redaktÉ™lÉ™rin Ã¼mumi sayÄ±:';
            spliter=',';
            donate='<a href="http://wikimediafoundation.org/wiki/BaÄŸÄ±ÅŸlar">Wikimedia Foundation tÉ™ÅŸkilatÄ±na ianÉ™lÉ™rin gÃ¶ndÉ™rilmÉ™si</a>';
            f11='EkranÄ±n tam aÃ§Ä±lmasÄ± Ã¼Ã§Ã¼n F11 dÃ¼ymÉ™sini basÄ±n';
            author='<a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> tÉ™rÉ™findÉ™n (<a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a> dÉ™stÉ™yi ilÉ™) iÅŸlÉ™nmiÅŸdir';
            break;
        case "be":
            header='ÐÐ³ÑƒÐ»Ð°Ð¼ Ð¿Ñ€Ð°Ð²Ð°Ðº Ñƒ <a href="http://www.wikimedia.org">Ð¿Ñ€Ð°ÐµÐºÑ‚Ð°Ñ… Ð¤ÑƒÐ½Ð´Ð°Ñ†Ñ‹Ñ– Â«Ð’Ñ–ÐºÑ–Ð¼ÑÐ´Ñ‹ÑÂ»</a>:';
            spliter='&nbsp;';
            donate='<a href="http://wikimediafoundation.org/wiki/Support_Wikipedia">ÐÑ…Ð²ÑÑ€ÑƒÐ¹Ñ†Ðµ Ð¤ÑƒÐ½Ð´Ð°Ñ†Ñ‹Ñ– Ð’Ñ–ÐºÑ–Ð¼ÑÐ´Ñ‹Ñ</a>';
            f11='ÐÐ°Ñ†Ñ–ÑÑŒÐ½Ñ–Ñ†Ðµ F11 Ð´Ð»Ñ Ð¿Ð¾ÑžÐ½Ð°ÑÐºÑ€Ð°Ð½Ð½Ð°Ð³Ð° Ð¿Ñ€Ð°Ð³Ð»ÑÐ´Ñƒ';
            author='Ð Ð°ÑÐ¿Ñ€Ð°Ñ†Ð°Ð²Ð°Ñž <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (Ñ–Ð´ÑÑ <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "bg":
            header='ÐžÐ±Ñ‰ Ð±Ñ€Ð¾Ð¹ Ñ€ÐµÐ´Ð°ÐºÑ†Ð¸Ð¸ Ð² <a href="http://www.wikimedia.org">Ð¿Ñ€Ð¾ÐµÐºÑ‚Ð¸Ñ‚Ðµ Ð½Ð° Ð£Ð¸ÐºÐ¸Ð¼ÐµÐ´Ð¸Ñ</a>:';
            spliter='&nbsp;';
            donate='<a href="http://wikimediafoundation.org/wiki/Support_Wikipedia">ÐŸÐ¾Ð´ÐºÑ€ÐµÐ¿ÐµÑ‚Ðµ Ñ Ð´Ð°Ñ€ÐµÐ½Ð¸Ðµ Ð¤Ð¾Ð½Ð´Ð°Ñ†Ð¸Ñ Ð£Ð¸ÐºÐ¸Ð¼ÐµÐ´Ð¸Ñ</a>';
            f11='ÐÐ°Ñ‚Ð¸ÑÐ½ÐµÑ‚Ðµ F11 Ð·Ð° Ð¿Ð¾ÐºÐ°Ð·Ð²Ð°Ð½Ðµ Ð½Ð° Ð³Ð¾Ð»ÑÐ¼ ÐµÐºÑ€Ð°Ð½';
            author='Ð Ð°Ð·Ñ€Ð°Ð±Ð¾Ñ‚ÐµÐ½Ð¾ Ð¾Ñ‚ <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (Ð²Ð´ÑŠÑ…Ð½Ð¾Ð²ÐµÐ½Ð¾ Ð¾Ñ‚ <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "bn":
            header='<a href="http://www.wikimedia.org">à¦‰à¦‡à¦•à¦¿à¦®à¦¿à¦¡à¦¿à¦¯à¦¼à¦¾à¦° à¦¬à¦¿à¦­à¦¿à¦¨à§à¦¨ à¦ªà§à¦°à¦•à¦²à§à¦ªà§‡</a> à¦¸à¦°à§à¦¬à¦®à§‹à¦Ÿ à¦¸à¦®à§à¦ªà¦¾à¦¦à¦¨à¦¾à¦° à¦¸à¦‚à¦–à§à¦¯à¦¾:';
            spliter=',';
            donate='<a href="http://wikimediafoundation.org/wiki/Support_Wikipedia">à¦‰à¦‡à¦•à¦¿à¦®à¦¿à¦¡à¦¿à¦¯à¦¼à¦¾ à¦«à¦¾à¦‰à¦¨à§à¦¡à§‡à¦¶à¦¨à§‡ à¦¦à¦¾à¦¨ à¦•à¦°à§à¦¨</a>';
            f11='à¦¸à¦®à§à¦ªà§‚à¦°à§à¦¨ à¦¸à§à¦•à§à¦°à¦¿à¦¨ à¦œà§à¦¡à¦¼à§‡ à¦¦à§‡à¦–à¦¤à§‡ à¦¹à¦²à§‡ F11 à¦šà¦¾à¦ªà§à¦¨';
            author='à¦à¦‡ à¦•à¦¾à¦‰à¦¨à§à¦Ÿà¦¾à¦°à¦Ÿà¦¿ à¦¤à§ˆà¦°à§€ à¦•à¦°à§‡à¦›à§‡à¦¨ <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (<a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a> à¦à¦° à¦…à¦¨à§à¦ªà§à¦°à§‡à¦°à¦£à¦¾à¦¯à¦¼)';
            break;
        case "br":
            header='Niver hollek a gemmoÃ¹ er <a href="http://www.wikimedia.org">raktresoÃ¹ Wikimedia</a> :';
            spliter='&nbsp;';
            donate='<a href="http://wikimediafoundation.org/wiki/Support_Wikipedia">DonezoniÃ± da Ziazezadur Wikimedia</a>';
            f11='Pouezit war F11 evit ar mod skramm leun';
            author='Diorroet gant <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (Awenet gant <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "bs":
            header='Ukupne izmjene u svim <a href="http://www.wikimedia.org">Wikimedia projektima</a>:';
            spliter='.';
            donate='<a href="http://wikimediafoundation.org/wiki/Support_Wikipedia">Donirajte Wikimedia Fondaciji</a>';
            f11='Pritisnite F11 za prikaz preko cijelog ekrana';
            author='Razvio korisnik <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (Inspiriran od strane <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "ca":
            header='Edicions entre tots els <a href="http://www.wikimedia.org">projectes de Wikimedia</a>:';
            spliter='.';
            donate='<a href="http://wikimediafoundation.org/wiki/Donatius">Dona a la FundaciÃ³ Wikimedia</a>';
            f11='Pantalla completa pulsant F11';
            author='Desarrollat per <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (Inspirat en <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "ceb":
            header='Mga tibuok kausaban sa <a href="http://www.wikimedia.org">mga proyekto sa Wikimedya</a>:';
            spliter=',';
            donate='<a href="http://wikimediafoundation.org/wiki/Support_Wikipedia">Idonar sa Wikimedia Foundation</a>';
            f11='Tuploka ang F11 aron mapuno sa tabil';
            author='Gipalambo ni <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (Nadasig sa <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "cs":
            header='CelkovÃ½ poÄet editacÃ­ v <a href="http://www.wikimedia.org">projektech nadace Wikimedia</a>:';
            spliter='&nbsp;';
            donate='<a href="http://wikimediafoundation.org/wiki/SponzorstvÃ­">PodpoÅ™te Wikimedia Foundation</a>';
            f11='StisknutÃ­m klÃ¡vesy F11 zobrazÃ­te strÃ¡nku na celou obrazovku';
            author='Vyvinul <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (inspirovÃ¡no strÃ¡nkami <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "cy":
            header='Cyfanswm yr holl olygiadau ym <a href="http://www.wikimedia.org">mhrosiectau Wikimedia</a>:';
            spliter='&nbsp;';
            donate='<a href="http://wikimediafoundation.org/wiki/Support_Wikipedia">Cyfrannwch at Sefydliad Wikimedia</a>';
            f11='Gwasgwch F11 am sgrÃ®n lawn';
            author='Datblygwyd gan <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (Ysbrydolwyd gan <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "da":
            header='Samlet antal rettelser pÃ¥ tvÃ¦rs af alle <a href="http://www.wikimedia.org">Wikimedia-projekter</a>:';
            spliter='.';
            donate='<a href="http://wikimediafoundation.org/wiki/Indsamling">Giv et bidrag til Wikimedia Foundation</a>';
            f11='Tryk F11 for fuldskÃ¦rmsvisning';
            author='Udviklet af <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (Inspireret af <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "de":
            header='Gesamtzahl der Bearbeitungen in <a href="http://www.wikimedia.org">den Wikimedia-Projekten</a>:';
            spliter='&#8239;';
            donate='<a href="http://wikimediafoundation.org/wiki/Spenden">Spende an die Wikimedia Foundation</a>';
            f11='DrÃ¼cken Sie F11 fÃ¼r Vollbild-Anzeige';
            author='Entwickelt von <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (Inspiriert durch <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "el":
            header='Î£Ï…Î½Î¿Î»Î¹ÎºÎ­Ï‚ ÎµÏ€ÎµÎ¾ÎµÏÎ³Î±ÏƒÎ¯ÎµÏ‚ ÏƒÏ„Î± <a href="http://www.wikimedia.org">ÎµÎ³Ï‡ÎµÎ¹ÏÎ®Î¼Î±Ï„Î± Ï„Î¿Ï… Wikimedia</a>:';
            spliter='.';
            donate='<a href="http://wikimediafoundation.org/wiki/Support_Wikipedia">ÎšÎ¬Î½Ï„Îµ Î´Ï‰ÏÎµÎ¬ ÏƒÏ„Î¿ ÎŠÎ´ÏÏ…Î¼Î± Wikimedia</a>';
            f11='Î Î±Ï„Î®ÏƒÏ„Îµ F11 Î³Î¹Î± Ï€Î»Î®ÏÎ· Î¿Î¸ÏŒÎ½Î·';
            author='Î‘Î½Î±Ï€Ï„ÏÏ‡Î¸Î·ÎºÎµ Î±Ï€ÏŒ Ï„Î¿Î½ <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (Î•Î¼Ï€Î½ÎµÏ…ÏƒÎ¼Î­Î½Î¿ Î±Ï€ÏŒ Ï„Î¿ <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "eo":
            header='Totala nombro de redaktoj en <a href="http://www.wikimedia.org">Vikimediaj projektoj</a>:';
            spliter='.';
            donate='<a href="http://wikimediafoundation.org/wiki/Monkolektado">Donaci al FondaÄµo Vikimedio</a>';
            f11='Premu F11 por plenekrana modo';
            author='Kreita de <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (Inspirita de <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "es":
            header='Ediciones entre todos los <a href="http://www.wikimedia.org">proyectos Wikimedia</a>:';
            spliter='.';
            donate='<a href="http://wikimediafoundation.org/wiki/Donaciones">Dona a la FundaciÃ³n Wikimedia</a>';
            f11='Pantalla completa pulsando F11';
            author='Desarrollado por <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (Inspirado en <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "et":
            header='<a href="http://www.wikimedia.org">Wikimedia projektides</a> tehtud redigeerimiste koguarv:';
            spliter='&nbsp;';
            donate='<a href="http://wikimediafoundation.org/wiki/Support_Wikipedia">Anneta Wikimedia sihtasutusele</a>';
            f11='TÃ¤isekraani jaoks vajuta F11';
            author='Kasutajalt <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (<a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a> eeskujul)';
            break;
        case "eu":
            header='<a href="http://www.wikimedia.org">Wikimedia proiektuetan</a> egindako eguneraketak guztira:';
            spliter='.';
            donate='<a href="http://wikimediafoundation.org/wiki/Dohaintzak">Wikimedia Foundazioari dohaintza egin</a>';
            f11='F11 sakatu pantaila osoan erakusteko';
            author='<a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a>-ek garatua (<a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>-ek inspiratuta)';
            break;
        case "fa":
            header='Ù…Ø¬Ù…ÙˆØ¹ ÙˆÛŒØ±Ø§ÛŒØ´â€Ù‡Ø§ Ø¯Ø± <a href="http://www.wikimedia.org">Ù¾Ø±ÙˆÚ˜Ù‡ ÙˆÛŒÚ©ÛŒâ€Ù…Ø¯ÛŒØ§</a>:';
            spliter=',';
            donate='<a href="http://wikimediafoundation.org/wiki/Support_Wikipedia">Ú©Ù…Ú© Ù…Ø§Ù„ÛŒ Ø¨Ù‡ Ø¨Ù†ÛŒØ§Ø¯ ÙˆÛŒÚ©ÛŒâ€Ù…Ø¯ÛŒØ§</a>';
            f11='Ø±Ø§ Ø¨Ø±Ø§ÛŒ Ù†Ù…Ø§ÛŒØ´ ØªÙ…Ø§Ù… ØµÙØ­Ù‡ ÙØ´Ø§Ø± Ø¯Ù‡ÛŒØ¯ F11Ú©Ù„ÛŒØ¯';
            author='Ú¯Ø³ØªØ±Ø´â€ŒÛŒØ§ÙØªÙ‡ Ø¨ÙˆØ³ÛŒÙ„Ù‡ <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (Ø¨Ø§ Ø§Ù„Ù‡Ø§Ù… Ø§Ø² <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "fr":
            header="Nombre total d'Ã©ditions dans les <a href='http://www.wikimedia.org'>projets Wikimedia</a>:"; // be careful with d'Ã©ditions
            spliter='&nbsp;';
            donate='<a href="http://wikimediafoundation.org/wiki/Faire_un_don">Donner Ã  la Wikimedia Foundation</a>';
            f11='Appuyez sur F11 pour passer en plein Ã©cran';
            author='DÃ©veloppÃ© par <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (InspirÃ© par <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "hi":
            header='<a href="http://www.wikimedia.org">à¤µà¤¿à¤•à¤¿à¤®à¥€à¤¡à¤¿à¤¯à¤¾ à¤ªà¤°à¤¿à¤¯à¥‹à¤œà¤¨à¤¾</a> à¤®à¥‡à¤‚ à¤•à¥à¤² à¤¸à¤‚à¤ªà¤¾à¤¦à¤¨:';
            spliter='&nbsp;';
            donate='<a href="http://wikimediafoundation.org/wiki/Donate/hi">à¤µà¤¿à¤•à¤¿à¤®à¥€à¤¡à¤¿à¤¯à¤¾ à¤«à¤¼à¥Œà¤‚à¤¡à¥‡à¤¶à¤¨ à¤•à¥‹ à¤¦à¤¾à¤¨ à¤•à¤°à¥‡à¤‚à¥¤ </a>';
            f11='à¤ªà¥‚à¤°à¥à¤£ à¤¸à¥à¤•à¥à¤°à¥€à¤¨ à¤•à¥‡ à¤²à¤¿à¤ à¤à¤«à¤¼à¥§à¥§ [F11] à¤¦à¤¬à¤¾à¤à¤à¥¤';
            author='<a href="https://en.wikipedia.org/wiki/User:Emijrp">à¤à¤®à¤¿à¤œà¤†à¤°à¤ªà¥€ [emijrp]</a> à¤¦à¥à¤µà¤¾à¤°à¤¾ à¤µà¤¿à¤•à¤¸à¤¿à¤¤ (<a href="http://www.7is7.com/software/firefox/partycounter.html">à¥­à¤‡à¤¸à¥­ [7is7]</a> à¤¦à¥à¤µà¤¾à¤°à¤¾ à¤ªà¥à¤°à¥‡à¤°à¤¿à¤¤à¥¤)';
            break;
        case "hu":
            header='<a href="http://www.wikimedia.org">A WikimÃ©dia projektek</a> egyÃ¼ttes szerkesztÃ©sszÃ¡ma:';
            spliter='&nbsp;';
            donate='<a href="http://wikimediafoundation.org/wiki/Support_Wikipedia/hu">TÃ¡mogasd a WikimÃ©dia AlapÃ­tvÃ¡nyt</a>';
            f11='Teljes kÃ©pernyÅ‘s mÃ³d: F11';
            author='KÃ©szÃ­tette: <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (<a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a> Ã¶tlete alapjÃ¡n)';
            break;
        case "id":
            header='Jumlah suntingan di <a href="http://www.wikimedia.org">proyek Wikimedia</a>:';
            spliter='.';
            donate='<a href="http://wikimediafoundation.org/wiki/Penggalangan_dana">Menyumbang untuk Yayasan Wikimedia</a>';
            f11='Tekan F11 untuk tampilan layar penuh';
            author='Dikembangkan oleh <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (Terinspirasi dari <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "it":
            header='Modifiche totali nei <a href="http://www.wikimedia.org">progetti Wikimedia</a>:';
            spliter='.';
            donate='<a href="http://wikimediafoundation.org/wiki/Donazioni">Fai una donazione a Wikimedia Foundation</a>';
            f11='Premi F11 per passare a schermo intero';
            author='Sviluppato da <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (ispirato da <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "ja":
            header='<a href="http://www.wikimedia.org">ã‚¦ã‚£ã‚­ãƒ¡ãƒ‡ã‚£ã‚¢ãƒ»ãƒ—ãƒ­ã‚¸ã‚§ã‚¯ãƒˆ</a>ã®ç·ç·¨é›†å›žæ•°';
            spliter=',';
            donate='<a href="http://wikimediafoundation.org/wiki/Support_Wikipedia">ã‚¦ã‚£ã‚­ãƒ¡ãƒ‡ã‚£ã‚¢è²¡å›£ã«å¯„ä»˜</a>';
            f11='F11ã‚­ãƒ¼ã§ãƒ•ãƒ«ã‚¹ã‚¯ãƒªãƒ¼ãƒ³è¡¨ç¤º';
            author='é–‹ç™ºï¼š<a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (åŽŸæ¡ˆï¼š<a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "kl":
            header='Tamakkiisumik amerlassutsit aaqqissuussinerni <a href="http://www.wikimedia.org">Wikimedia suliniutaani</a>:';
            spliter='.';
            donate='<a href="http://wikimediafoundation.org/wiki/Support_Wikipedia">Wikimedia suliniutaani tunissuteqarit</a>';
            f11='F11 tooruk tamaat saqqummissagukku';
            author='Siuarsaasuuvoq <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (Peqatigalugu <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "ko":
            header='<a href="http://www.wikimedia.org">ìœ„í‚¤ë¯¸ë””ì–´ ìž¬ë‹¨ì—ì„œ ìš´ì˜í•˜ëŠ” í”„ë¡œì íŠ¸</a>ì˜ ì´ íŽ¸ì§‘ íšŸìˆ˜:';
            spliter=',';
            donate='<a href="http://wikimediafoundation.org/wiki/Support_Wikipedia">ìœ„í‚¤ë¯¸ë””ì–´ ìž¬ë‹¨ì— ê¸°ë¶€í•˜ê¸°</a>';
            f11='F11 í‚¤ë¥¼ ëˆ„ë¥´ë©´ ì „ì²´ í™”ë©´ ëª¨ë“œë¡œ ì „í™˜í•©ë‹ˆë‹¤';
            author='<a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a>ì´ ë§Œë“¬ (<a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>ì—ì„œ ì˜ê°ì„ ì–»ìŒ)';
            break;
        case "nl":
            header='Totaal aantal bewerkingen in <a href="http://www.wikimedia.org">Wikimediaprojecten</a>:';
            //spliter='&nbsp;';
            //donate='<a href="http://wikimediafoundation.org/wiki/Support_Wikipedia"></a>';
            //f11='';
            //author='<a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (<a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "pl":
            header='OgÃ³lna liczba edycji w <a href="http://www.wikimedia.org">projektach Wikimedia</a>:';
            spliter='&nbsp;';
            donate='<a href="http://wikimediafoundation.org/wiki/Dary_pieniÄ™Å¼ne">Wesprzyj Wikimedia Foundation</a>';
            f11='NaciÅ›nij F11, aby wÅ‚Ä…czyÄ‡ tryb peÅ‚noekranowy';
            author='Stworzony przez <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (zainspirowany przez <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "pt":
            header='Total de ediÃ§Ãµes nos <a href="http://www.wikimedia.org">projetos Wikimedia</a>:';
            spliter='.';
            donate='<a href="http://wikimediafoundation.org/wiki/Coleta_de_fundos">Doe para a FundaÃ§Ã£o Wikimedia</a>';
            f11='Pressione F11 para tela cheia';
            author='Desenvolvido por <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (Inspirado em <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "ro":
            header='NumÄƒrul total de modificÄƒri Ã®n <a href="http://www.wikimedia.org">proiectele Wikimedia</a>:';
            spliter='.';
            donate='<a href="http://wikimediafoundation.org/wiki/DonaÅ£ii">DonaÅ£i pentru Wikimedia</a>';
            f11='ApÄƒsaÈ›i F11 pentru afiÈ™area pe tot ecranul';
            author='Dezvoltat de <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (inspirat de la <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "ru":
            header='Ð’ÑÐµÐ³Ð¾ Ð¿Ñ€Ð°Ð²Ð¾Ðº Ð² <a href="http://www.wikimedia.org">Ð¿Ñ€Ð¾ÐµÐºÑ‚Ð°Ñ… Ð’Ð¸ÐºÐ¸Ð¼ÐµÐ´Ð¸Ð°</a>:';
            spliter='&nbsp;';
            donate='<a href="http://wikimediafoundation.org/wiki/Support_Wikipedia/ru">ÐŸÐ¾Ð¶ÐµÑ€Ñ‚Ð²ÑƒÐ¹Ñ‚Ðµ Â«Ð¤Ð¾Ð½Ð´Ñƒ Ð’Ð¸ÐºÐ¸Ð¼ÐµÐ´Ð¸Ð°Â»</a>';
            f11='ÐÐ°Ð¶Ð¼Ð¸Ñ‚Ðµ F11 Ð´Ð»Ñ Ð¿Ð¾ÐºÐ°Ð·Ð° Ð½Ð° Ð²ÐµÑÑŒ ÑÐºÑ€Ð°Ð½';
            author='Ð Ð°Ð·Ñ€Ð°Ð±Ð¾Ñ‚Ð°Ð» <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (ÐžÑÐ½Ð¾Ð²Ð°Ð½Ð¾ Ð½Ð° <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "sv":
            header='Antal redigeringar i <a href="http://www.wikimedia.org">Wikimediaprojekten</a>:';
            spliter='&nbsp;';
            donate='<a href="http://wikimediafoundation.org/wiki/Insamling">Donera till Wikimedia Foundation</a>';
            f11='Tryck F11 fÃ¶r helskÃ¤rm';
            author='Utvecklad av <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (Inspirerad av <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
            break;
        case "te":
            header='<a href="http://www.wikimedia.org">à°µà°¿à°•à±€à°®à±€à°¡à°¿à°¯à°¾ à°ªà±à°°à°¾à°œà±†à°•à±à°Ÿà±à°²</a>à°²à±‹ à°®à±Šà°¤à±à°¤à°‚ à°¦à°¿à°¦à±à°¦à±à°¬à°¾à°Ÿà±à°²à±:';
            spliter=',';
            donate='<a href="http://wikimediafoundation.org/wiki/Support_Wikipedia">à°µà°¿à°•à±€à°®à±€à°¡à°¿à°¯à°¾ à°«à±Œà°‚à°¡à±‡à°·à°¨à±à°•à°¿ à°µà°¿à°°à°¾à°³à°®à°¿à°µà±à°µà°‚à°¡à°¿</a>';
            f11='à°¨à°¿à°‚à°¡à±à°¤à±†à°° à°•à±Šà°°à°•à± F11 à°¨à±Šà°•à±à°•à°‚à°¡à°¿';
            author='à°°à±‚à°ªà±Šà°‚à°¦à°¿à°‚à°šà°¿à°¨à°¦à°¿ <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (<a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a> à°ªà±à°°à±‡à°°à°£à°¤à±‹)';
            break;
        default:
            header='Total edits in <a href="http://www.wikimedia.org">Wikimedia projects</a>:';
            spliter=',';
            donate='<a href="http://wikimediafoundation.org/wiki/Support_Wikipedia">Donate to Wikimedia Foundation</a>';
            f11='Press F11 for fullscreen';
            author='Developed by <a href="https://en.wikipedia.org/wiki/User:Emijrp">emijrp</a> (Inspired by <a href="http://www.7is7.com/software/firefox/partycounter.html">7is7</a>)';
    }
    
    //document.getElementById('header').innerHTML = header;
    //document.getElementById('donate').innerHTML = donate;
    //document.getElementById('f11').innerHTML = f11;
    //document.getElementById('author').innerHTML = author;
    
    window.setTimeout(update, period);
}

function update() {
   timenow2 = new Date().getTime();
   if (Math.round(((timenow2-timenow)/1000)+1) % 600 == 0) { window.setTimeout(window.location.reload(), 1100); } //refresh page
   editnow = editinit + (timenow2-timeinit) * editrate;
   editnowtext = ""+Math.round(editnow);
   for(var i=3; i<editnowtext.length; i+=3) {
      editnowtext = editnowtext.replace(spliter_r,'$2'+spliter+'$3');
   }
   document.getElementById('counter').innerHTML = editnowtext;
   window.setTimeout(update, period);
}

function adjustSizes(){
    var width=800;
    var height=600;
    if (self.innerWidth) { 
        width=self.innerWidth;
        height=self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientWidth) { 
        width=document.documentElement.clientWidth;
        height=document.documentElement.clientHeight;
    } else if (document.body) {
        width=document.body.clientWidth;
        height=document.body.clientHeight;
    }
    //document.getElementById('wrapper').style.height=(height-10)+'px';
    //document.getElementById('header').style.fontSize=width/60+'pt';
    //document.getElementById('footer').style.fontSize=width/60+'pt';
    document.getElementById('counter').style.fontSize=width/12+'pt';
}

window.onload = init;
window.onresize = adjustSizes;