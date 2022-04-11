const intarray = [0,1,2,3,4,5,6,7,8,9];
const listcontinue = document.querySelector("#list-continue");

class ListBurton extends React.Component {
    ListClick() {
        function Red() {
            const arr = intarray.map((asheley) =>
                <li>{asheley}</li>
            );

            return (
                <ul>
                    {arr}
                </ul>
            );
        }

        ReactDOM.render(<Red />, listcontinue);
    }
}