import axios from 'axios';

const productItems = document.querySelectorAll('ul[data-automation-id="search-result-gridview-items"] li[data-tl-id]');

productItems.forEach((item, i) => {
  requestDocument(item);
});

async function requestDocument(item) {
  const anhorItem = item.querySelector('.search-result-productimage');
  const { data: documentProduct } = await axios.get(anhorItem.href, { responseType: 'document'});
  const contentScriptImages = documentProduct.querySelector('script#item').textContent;

  /*
   товар в скрипте:

   {"id":"F341F590607B41798048574125DCE6E6",
    "url":"https://i5.walmartimages.com/asr/7188f10b-a2a0-4eea-b950-c49cdb563686_1.0c5ebf4cdeb818a1517dc56b1eaca280.jpeg"
    "zoomable":true
    }

  */
  const regExp = /{"id":"[A-Z0-9]{1,32}","url":"https?:\/\/[^"]+",?("zoomable":true)?},?/g;
  const imagesCount = contentScriptImages.match(regExp).length;

  const descriptionItem = item.querySelector('.product-price-with-fulfillment').parentElement;
  const paragraph = document.createElement('p');
  paragraph.textContent = `[IMAGES: ${imagesCount}]`;
  paragraph.style.color = 'red';
  paragraph.style.marginBottom = '10px';
  paragraph.style.marginLeft = '10px';

  descriptionItem.after(paragraph);
};
