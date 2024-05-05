import { useEffect } from "react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";


const Services = () => {
    const [ services, setServices] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/services')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(error => console.error(error))
    }, [])

    return (
        <div className="mt-6">
            <div className="flex flex-col justify-center items-center ">
                <h3 className="text-3xl text-orange-600 font-semibold">Services</h3>
                <h2 className="text-5xl font-bold">Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. </p>
            </div>
            <div className="grid lg:grid-cols-3  grid-cols-1 md:grid-cols-2 space-y-5 mt-4 gap-6">
                {
                    services.map(service =>
                        <div
                            key={service._id}
                            className="card w-96 bg-base-100 border-2 shadow-md">
                            <figure className="px-10 pt-10">
                                <img src={service.img} alt="service_img" className="rounded-xl" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{service.title}</h2>
                                <p className="text-[#FF3811] font-medium">Price : {service.price}</p>
                                <div className="card-actions justify-end">
                                    <Link to={`checkout/${service._id}`}>
                                       <FaArrowRight className="text-red-600 text-xl"></FaArrowRight>
                                    </Link>
                                   
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default Services;