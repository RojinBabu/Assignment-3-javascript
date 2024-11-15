// Smoothie Class
class Smoothie {
    constructor(name, size, sizePrice, ingredients, ingredientsPrice, extras, extrasPrice, comments) {
        this.name = name;
        this.size = size;
        this.sizePrice = sizePrice;
        this.ingredients = ingredients;
        this.ingredientsPrice = ingredientsPrice;
        this.extras = extras;
        this.extrasPrice = extrasPrice;
        this.comments = comments;
        this.totalPrice = sizePrice + ingredientsPrice + extrasPrice;
    }

    display() {
        const details = document.getElementById('smoothieDetails');
        const imageContainer = document.getElementById('smoothieImage');
        const bill = document.getElementById('smoothieBill');
        const fact = document.getElementById('smoothieFact');

        // Display smoothie details
        details.innerHTML = `
            <h2>Thank you for your order, ${this.name}!</h2>
            <p><strong>Size:</strong> ${this.size} ($${this.sizePrice})</p>
            <p><strong>Ingredients:</strong> ${this.ingredients.join(', ') || 'None'} ($${this.ingredientsPrice})</p>
            <p><strong>Add-ons:</strong> ${this.extras} ($${this.extrasPrice})</p>
            <p><strong>Special Instructions:</strong> ${this.comments || 'None'}</p>
        `;

        // Display bill
        bill.innerHTML = `<h3>Total Price: $${this.totalPrice.toFixed(2)}</h3>`;

        // Update smoothie image
        let ingredientsImages = this.ingredients.map(
            ingredient => `<img src="https://www.eatingwell.com/thmb/CokPYaf2YPnPACHBls_LVhyUp0g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/healthy-breakfast-smoothie-8029983-4000x4000-3e02d40929c8410c877a171a235c99bc.jpg" alt="${ingredient}">`
        ).join('');
        imageContainer.innerHTML = `
            <img id="smoothieCup" src="https://media.istockphoto.com/id/1313644815/photo/strawberry-smoothie.jpg?s=612x612&w=0&k=20&c=CJ5DBRKWWX_NrH19EIRgJny7gPGNxF8gIVpHNFk8OMs=" alt="Smoothie Cup">
            <div id="ingredientsImages">${ingredientsImages}</div>
        `;

        // Display a fun smoothie fact
        const facts = [
            "Did you know? Smoothies originated in Brazil in the 1930s!",
            "Adding spinach to your smoothie boosts your iron intake!",
            "Bananas are natural sweeteners for your smoothies!",
            "Mangoes are packed with Vitamin C – great for your skin!",
            "Blueberries are superfoods rich in antioxidants!"
        ];
        fact.innerHTML = `<p><strong>Fun Fact:</strong> ${facts[Math.floor(Math.random() * facts.length)]}</p>`;
    }
}

// Event Listener for Form Submission
document.getElementById('smoothieForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Capture form values
    const name = document.getElementById('name').value;
    const sizeElement = document.querySelector('input[name="size"]:checked');
    const size = sizeElement.value;
    const sizePrice = parseFloat(sizeElement.getAttribute('data-price'));

    const ingredientsElements = Array.from(document.querySelectorAll('input[name="ingredients"]:checked'));
    const ingredients = ingredientsElements.map(input => input.value);
    const ingredientsPrice = ingredientsElements.reduce((total, input) => total + parseFloat(input.getAttribute('data-price')), 0);

    const extrasElement = document.getElementById('extras');
    const extras = extrasElement.value;
    const extrasPrice = extrasElement.selectedOptions[0].getAttribute('data-price') ? parseFloat(extrasElement.selectedOptions[0].getAttribute('data-price')) : 0;

    const comments = document.getElementById('comments').value;

    // Create Smoothie object
    const smoothie = new Smoothie(name, size, sizePrice, ingredients, ingredientsPrice, extras, extrasPrice, comments);
    smoothie.display();
});
