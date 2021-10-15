import Table from 'react-bootstrap/Table'


const DataTable = ({ data }) => {
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Product Title</th>
                    <th>Quantity</th>
                    <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((dt, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{dt.productTitle}</td>
                            <td>{dt.quantity}</td>
                            <td>{dt.totalAmount}</td>
                        </tr>
                    ))}

                </tbody>

            </Table>
        </div>
    )
}


export default DataTable;