/**
TO DO
- Get user selection
- Store selection
- Get user operation
- Compute user operation
- Get and store total score
- Display information on screen
*/

const database = {};
const getDOM = { btnArr: Array.from(document.querySelectorAll('.calc__btn')) };
let numStr = '';
const calcArr = [];

let calcStr = '';
const getUserInput = () => {
	getDOM.btnArr.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			if (e.target.dataset.type === 'num') {
				numStr += e.target.dataset.value;
			} else if (e.target.dataset.type === 'operator') {
				calcArr.push(numStr);
				calcArr.push(e.target.dataset.value);
				numStr = '';
				console.log(calcArr);
			}
		});
	});
};

getUserInput();
