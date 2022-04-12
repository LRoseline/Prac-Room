const a = "Hello";
const listarray = (
    <div>
        <li>{a}</li>
        <li>{a}</li>
        <li>{a}</li>
    </div>
);

const renderFor = (num) => {
    const result = [];

    for (let i = 1; i <= num; i++) {
        result.push(<li key={i.toString()}>{i}</li>);
    }

    return result;
}

const renderResult = (
    <ul>
        {renderFor(10)}
    </ul>
);

const testA = document.getElementById('testA');
const testB = document.getElementById('testB');
const testC = document.getElementById('testC');
ReactDOM.render(<h1>Hello, world!</h1>, testA);
ReactDOM.render(listarray, testB);
ReactDOM.render(renderResult, testC);