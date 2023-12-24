function showCard(cardId) {
    // Hide all card images
    var cardImages = document.querySelectorAll('.card-img img');
    cardImages.forEach(function (img) {
        img.style.display = 'none';
    });

    // Show the selected card image
    var selectedCard = document.getElementById(cardId);
    if (selectedCard) {
        selectedCard.style.display = 'block';
    }
}
