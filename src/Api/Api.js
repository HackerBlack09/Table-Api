import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Button, Input, Table } from "reactstrap"
import Swal from "sweetalert2";


export function Api() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState("");
    const [data1, setData1] = useState([])
    const url = "https://fakestoreapi.com/products"

    useEffect(() => {
        axios
            .get(url)
            .then((res) => setData(res.data))
            .catch((err) => console.log(err))
        setData1(data)
        console.log(data1);
    }, [])

    //-----------------remove--------------------

    function remove(id) {
        Swal.fire({
            title: "O'chirmoqchimisiz?",
            text: "Buni qaytara olmaysiz!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ha, o'chirib tashlang!",
        }).then((result) => {
            if (result.isConfirmed) {
                setData(data.filter((val) => val.id !== id));
                Swal.fire("O'chirildi!", "Faylingiz o'chirildi.", "success");
            }
        });
    }

    //------------------------category-------------------

    const category = ["All", ...new Set(data.map((val) => val.category))];

    function fun(i) {
        let filter = data.filter((val) => val.category === category[i]);
        if (i !== 0) {
            setData1(filter)
        } else {
            setData1(data)
        }
    }

    return (
        <>
            <div className="table">
                <Input className="inn" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                <div className="butt">
                    {category.map((val, i) => (
                        <Button color="info" onClick={() => fun(i)} key={i} className="but">{val}</Button>
                    ))}
                </div>
                <Table bordered style={{ width: "1000px", textAlign: "center", marginLeft: "120px", marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                category
                            </th>
                            <th>
                                description
                            </th>
                            <th>
                                price
                            </th>
                            <th>
                                image
                            </th>
                            <th>
                                Remove
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data1.filter((item) => (
                            item.category.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                        )).map((iteam, index) => (
                            <tr key={index}>
                                <th scope="row">
                                    {iteam.id}
                                </th>
                                <td>
                                    {iteam.category}
                                </td>
                                <td>
                                    {iteam.description.slice(0, 50)}
                                </td>
                                <td>
                                    {iteam.price}$
                                </td>
                                <td>
                                    <img className="imgg" src={iteam.image} alt="img" />
                                </td>
                                <td>
                                    <Button color="danger" outline onClick={() => remove(iteam.id)}>
                                        Delet
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}