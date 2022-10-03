export default function infoBox(message, type) {
    const box = document.querySelector('.infoBox');
    box.style.opacity = '1';
    type == 'info' ? box.style.backgroundColor = '#48B791' : box.style.backgroundColor = '#DD5A5A';

    box.innerHTML = message;

    setTimeout(() => {
        box.style.opacity = '0';
    }, 5000);
}