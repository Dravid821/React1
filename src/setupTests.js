// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
e.preventDefault();
        setValue(e.target.value)
        const val = e.target.value
        if (val.length >= 1) {
            setShow(true)
            const filteredData = items.filter(data => data.title.toLowerCase().includes(e.target.value.toLowerCase()))
            setSearchList(filteredData)
        }
        else {
            setShow(false)
        }