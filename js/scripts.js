function addCard(content, id, linkElement) {
  const mainframe = document.getElementById("mainframe");

  if (mainframe && typeof content === 'string' && content.trim() !== '') {
    const cards = document.getElementsByClassName('card');
    const cardCount = cards.length;

    if (!document.getElementById(id)) {
      const newCard = document.createElement('div');

      try {
      const frameOffset = mainframe.getBoundingClientRect();
      const linkOffset = linkElement.getBoundingClientRect();
        console.log(frameOffset, linkOffset);

      const relX = linkOffset.left - frameOffset.left;
      const relY = linkOffset.top - frameOffset.top;
      console.log(relX, relY);

      const topOffset = relX;
      const leftOffset = relY;
      const zIndex = cardCount + 1;
      console.log(topOffset, leftOffset);

      newCard.id = id;
      newCard.className = 'card';
      newCard.style.top = `${topOffset + 15}px`;
      newCard.style.left = `${leftOffset + 15}px`;
      newCard.style.zIndex = zIndex;
      newCard.innerHTML = content;

      mainframe.appendChild(newCard);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.warn(`Element with ID ${id} already exists.`);
    }
  } else {
    console.error('Invalid mainframe or content.');
  }
}

function removeCard(id) {
  const mainframe = document.getElementById("mainframe");

  if (mainframe) {
    const card = document.getElementById(id);
    if (card) {
      mainframe.removeChild(card);
    } else {
      console.warn(`Element with ID ${id} not found.`);
    }
  } else {
    console.error('Mainframe not found.');
  }
}

async function callPagefindApi() {
  const pagefind = await import("/pagefind/pagefind.js");

  if (pagefind) {
    try {
      pagefind.init();
    } catch(err) {
      console.log(err);
    }
  } else {
    console.log("Import failed.");
  }
}

// Initialize Pagefind on page load
document.addEventListener('DOMContentLoaded', callPagefindApi);
