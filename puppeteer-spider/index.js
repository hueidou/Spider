const puppeteer = require('puppeteer');

(async () => {
    var url = 'http://qy1.sfda.gov.cn/datasearchcnda/face3/base.jsp?tableId=25&tableName=TABLE25&title=%E5%9B%BD%E4%BA%A7%E8%8D%AF%E5%93%81&bcId=152904713761213296322795806604';

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // 最好注入jQuery、lodash
    await page.goto(url);
    //await page.waitFor(5000);
    //await page.screenshot({path: 'example.png'});

    //page.on('load', () => console.log('load' + Date.now()));
    //page.on('domcontentloaded', () => console.log('domcontentloaded' + Date.now()));

    // 等待导航结束（未确认，浏览器表现上即loading转圈结束）
    await page.waitForNavigation();

    var elements = await page.evaluate(() => {
        var selector = '#content table:nth-child(2) a';
        var elements = document.querySelectorAll(selector);

        var list = [];
        elements.forEach(element => list.push({ href: element.href, text: element.text }));
        return list;
    });

    console.log(elements);

    // 不知如何监视方法，监视到内部Ajax请求结束，现采用sleep的方式，但不保险
    await page.evaluate(() => {
        window.devPage(2);
    });

    await page.waitFor(3000);

    var elements = await page.evaluate(() => {
        var selector = '#content table:nth-child(2) a';
        var elements = document.querySelectorAll(selector);

        var list = [];
        elements.forEach(element => list.push({ href: element.href, text: element.text }));
        return list;
    });

    console.log(elements);

    await browser.close();
})();