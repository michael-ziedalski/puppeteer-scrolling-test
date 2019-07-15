const puppeteer = require("puppeteer");
const scrollIntoView = require("scroll-into-view");

async function run(){
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--disable-features=CrossSiteDocumentBlockingAlways,CrossSiteDocumentBlockingIfIsolating"]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 800 });

  // Line fixing "Refused to load the script..." error.
  await page.setBypassCSP(true);

  await page.goto('https://news.ycombinator.com/');

  page.evaluate(`

    // Create a scrip node
    var scriptNode = document.createElement("script");

    // Set it's source to the prebuilt version of scroll-into-view
    scriptNode.setAttribute("src", "https://raw.githubusercontent.com/KoryNunn/scroll-into-view/master/scrollIntoView.min.js");

    // Append the script node to the body
    document.body.appendChild(scriptNode);

    scriptNode.addEventListener("load", () => {

        // Use scroll-into-view
        scrollIntoView(document.querySelector("tr#20442468 > td:nth-child(3) > div > a"));
        
    })
  `);
}

run();
