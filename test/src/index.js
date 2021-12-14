function createElement() {
    const element = document.createElement('div')
    element.innerHTML = '✨ Favicons Webpack Plugin test!  💻 ';

    return element
}
document.body.appendChild(createElement())