/**
TO DO
- Get user selection
- Store selection
- Get user operation
- Compute user operation
- Get and store total score
- Display information on screen
*/

let numStr = '';
let calcArr = [];
let result = 0;

const getDOM = {
	btnArr: Array.from(document.querySelectorAll('.calc__btn')),
	numBtnArr: Array.from(document.querySelectorAll('.num-btn')),
};

const getUserInput = () => {
	/*
	 ITERATE THROUGH EACH BUTTON, ADD AN EVENTLISTENER AND PERFORM AN ACTION BASED ON THE TYPE OF BUTTON
	 - For numbers, get the value and store in a string
	 - For operators aside '=', push the number string into an array, get the operator and push into the array
	 - For '=', call a function to calculate the user input by joining the array into a string and using javascript eval function
	 */
	getDOM.btnArr.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			if (e.target.dataset.type === 'num') {
				/* 
				CHECK THE CALC ARRAY FOR LAST ELEMENT. 
				- If it's a number, then it's the total from the previous calculation and DB will be reset 
				- If it's a string, then it is part of the current calculation
				*/
				typeof calcArr[calcArr.length - 1] === 'number'
					? (resetDB(), (numStr += e.target.dataset.value))
					: (numStr += e.target.dataset.value);
			} else if (e.target.dataset.value === '=') {
				numStr ? calcArr.push(numStr) : false;
				calcNum();
				console.log(calcArr);

				// RETURN RESULT
				// STORE RESULT IN ARRAY

				// DISABLE NUMBER BUTTONS

				// disableNum();
			} else if (
				e.target.dataset.type === 'operator' &&
				e.target.dataset.value !== 'clear'
			) {
				numStr ? calcArr.push(numStr) : false;
				calcArr.push(e.target.dataset.value);
				numStr = '';
				console.log(calcArr);
			} else if (e.target.dataset.value === 'clear') {
				resetDB();
				// enableNum();
			}
		});
	});
};

const calcNum = () => {
	result = eval(calcArr.join(''));
	calcArr = [result];
	numStr = '';
	console.log(result);
};

const disableNum = () => {
	getDOM.numBtnArr.forEach((btn) => {
		btn.classList.add('disabled');
		btn.disabled = true;
	});
};

const enableNum = () => {
	getDOM.numBtnArr.forEach((btn) => {
		btn.classList.remove('disabled');
		btn.disabled = false;
	});
};

const resetDB = () => {
	numStr = '';
	calcArr = [];
	result = 0;
};
getUserInput();
