document.addEventListener('mousedown', transform)

function transform(e) {
  if (e.target.closest('.column') && !e.target.closest('.column').classList.contains('already')) {
    const target = e.target.closest('.column');
    const nextElement = target.nextElementSibling;
    const startPosition = e.clientX
    const initialVal2 = parseInt(nextElement.offsetLeft);
    const moveF = move(startPosition, target, nextElement, initialVal2)
    document.addEventListener('mousemove', moveF)
    document.addEventListener('mouseup', () => {
      if (target.style.flexGrow !== '1') {
        check(target, nextElement, 0, initialVal2)
        document.removeEventListener('mousemove', moveF)
      } else {
        document.removeEventListener('mousemove', moveF)
      }
    })
  }
}

const LIMIT_MAX = 300;
const LIMIT_MIN = 200;

function check(target, nextElement, initialVal1, initialVal2) {
  const left = parseInt(target.style.left);
  if (left > -LIMIT_MIN) {
    target.style.left = initialVal1 + 'px';
    nextElement.style.position = 'absolute';
    nextElement.style.left = initialVal2 + 'px';

  }
  if (left < -LIMIT_MIN && left > -LIMIT_MAX) {
    nextElement.style.position = 'relative';
    nextElement.style.left = 0 + 'px';
    nextElement.parentElement.style.justifyContent = 'space-between'
    target.style.left = '0px';
    target.style.flexGrow = '1';
    target.classList.add('already');
    nextElement.classList.add('already');
    nextElement.style.flexGrow = '1';

  }
}


function move(start, target, nextElement, initialVal2) {
  return (e) => {
    const shift = -(start - e.clientX);
    if (shift > -LIMIT_MAX && shift < 0) {
      target.style.left = shift + 'px'
      nextElement.style.left = initialVal2 - shift + 'px'
    }

  }

}
