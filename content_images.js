import axios from 'axios';
/**
 * @namespace Content_Images
 */

/**
 * array of product elements
 * @memberof Content_Images
 * @type {HTMLLIElement[]}
 */
const productItems = document.querySelectorAll('ul[data-automation-id="search-result-gridview-items"] li[data-tl-id]');


productItems.forEach((item, i) => {
  requestDocument(item);
});

 /**
  * Makes a GET request to get the number of product photos
  * @async
  * @memberof Content_Images
  * @param {HTMLLIElement} item product element
  * @returns {Promise} returns a promise , but it is not used in the code
  */
async function requestDocument(item) {
   /**
    * @namespace Content_Images_requestDocument
    */
  const anhorItem = item.querySelector('.search-result-productimage');
  const { data: documentProduct } = await axios.get(anhorItem.href, { responseType: 'document'});

  /**
   * text content in script with images
   * @memberof Content_Images_requestDocument
   * @type {string}
   */
  const contentScriptImages = documentProduct.querySelector('script#item').textContent;


   /**
    * RegExp with search images in product in the script
    * @memberof Content_Images_requestDocument
    * @type {RegExp}
    * @property {string} id image product
    * @property {string} url image product
    * @property {(string | null)} zoomable, this property may be missing
    * @example
    * {"id":"F341F590607B41798048574125DCE6E6",
    * "url":"https://i5.walmartimages.com/asr/7188f10b-a2a0-4eea-b950-c49cdb563686_1.0c5ebf4cdeb818a1517dc56b1eaca280.jpeg"
    * "zoomable":true
    * }
    */
  const regExp = /{"id":"[A-Z0-9]{1,32}","url":"https?:\/\/[^"]+",?("zoomable":true)?},?/g;
  const imagesCount = contentScriptImages.match(regExp).length;

  /**
   * @description The element contains the description of the product
   * @type {HTMLElement}
   * @memberof Content_Images_requestDocument
   * */
  const descriptionItem = item.querySelector('.product-price-with-fulfillment').parentElement;
  const paragraph = document.createElement('p');
  paragraph.textContent = `[IMAGES: ${imagesCount}]`;
  paragraph.style.color = 'red';
  paragraph.style.marginBottom = '10px';
  paragraph.style.marginLeft = '10px';

  descriptionItem.after(paragraph);
};
