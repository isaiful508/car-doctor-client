import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import BookingsTable from "../BookingsTable/BookingsTable";
import axios from "axios";



const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    const url = `http://localhost:5000/bookings?email=${user?.email}`;

    useEffect(() => {

        axios.get(url, {withCredentials: true})
        .then(res => {
            setBookings(res.data)
        })



        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //         setBookings(data);
        //     })

    }, [url])


    const handleDelete = id =>{
        const proceed = confirm('Are You Sure Want To Delete1');
        if(proceed){
            fetch(`http://localhost:5000/bookings/${id}`,{
                method : 'DELETE'
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data);
                if(data.deletedCount > 0){
                    alert("Deleted Successfully")
                    const remaining = bookings.filter(booking => booking._id !== id)
                    setBookings(remaining);
                }
            })
        }
    }

    const handleConfirm = id => {
        fetch(`http://localhost:5000/bookings/${id}`,{
            method: 'PATCH',
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify({status: 'confirm'})
        })
        .then(res =>res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount > 0) {
                const remaining = bookings.filter(booking => booking._id !== id );

                const updated = bookings.find( booking => booking._id === id)

                updated.status = 'confirm'
                const newBookings = [updated, ...remaining]
                setBookings(newBookings);
            }
        })
    }

    return (
        <div>
            <h2 className="text-4xl font-semibold text-center">Your Bookings: {bookings.length}</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service Name</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Details</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                       {
                        bookings.map(booking => <BookingsTable
                        booking={booking}
                        key={booking._id}
                        handleDelete={handleDelete}
                        handleConfirm={handleConfirm}
                        ></BookingsTable>)
                       }
                    
                       
                      
                        
                       
                        
                        
                    </tbody>
                    
                   

                </table>
            </div>

        </div>
    );
};

export default Bookings;