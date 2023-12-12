import React, { useState } from "react";
import { Link } from "react-router-dom";

const UpdateCourse = () => {
    const [formData, setFormData] = useState({
        courseTitle: "Build a Basic Bookcase",
        courseDescription:
            "High-end furniture projects are great to dream about. But unless you have a well-equipped shop and some serious woodworking experience to draw on, it can be difficult to turn the dream into a reality. Not every piece of furniture needs to be a museum showpiece, though. Often a simple design does the job just as well and the experience gained in completing it goes a long way toward making the next project even better. Our pine bookcase, for example, features simple construction and it's designed to be built with basic woodworking tools. Yet, the finished project is a worthy and useful addition to any room of the house. While it's meant to rest on the floor, you can convert the bookcase to a wall-mounted storage unit by leaving off the baseboard. You can secure the cabinet to the wall by screwing through the cabinet cleats into the wall studs. We made the case out of materials available at most building-supply dealers and lumberyards, including 1/2 x 3/4-in. parting strip, 1 x 2, 1 x 4 and 1 x 10 common pine and 1/4-in.-thick lauan plywood. Assembly is quick and easy with glue and nails, and when you're done with construction you have the option of a painted or clear finish. As for basic tools, you'll need a portable circular saw, hammer, block plane, combination square, tape measure, metal rule, two clamps, nail set and putty knife. Other supplies include glue, nails, sandpaper, wood filler and varnish or paint and shellac. The specifications that follow will produce a bookcase with overall dimensions of 10 3/4 in. deep x 34 in. wide x 48 in. tall. While the depth of the case is directly tied to the 1 x 10 stock, you can vary the height, width and shelf spacing to suit your needs. Keep in mind, though, that extending the width of the cabinet may require the addition of central shelf supports.",
        estimatedTime: "14 hours",
        materialsNeeded:
            "* 1/2 x 3/4 inch parting strip\n* 1 x 2 common pine\n* 1 x 4 common pine\n* 1 x 10 common pine\n* 1/4 inch thick lauan plywood\n* Finishing Nails\n* Sandpaper\n* Wood Glue\n* Wood Filler\n* Minwax Oil Based Polyurethane",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        
        console.log("Successful course update");
        
    };

    return (
        <div id="root">
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo">
                        <Link to="/">Courses</Link>
                    </h1>
                    <nav>
                        <ul className="header--signedin">
                            <li>Welcome, Joe Smith!</li>
                            <li>
                                <Link to="/sign-out">Sign Out</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main>
                <div className="wrap">
                    <h2>Update Course</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="main--flex">
                            <div>
                                <label html For="courseTitle">Course Title</label>
                                <input
                                    id="courseTitle"
                                    name="courseTitle"
                                    type="text"
                                    value={formData.courseTitle}
                                    onChange={handleChange}
                                />
                                <p>By Joe Smith</p>
                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea
                                    id="courseDescription"
                                    name="courseDescription"
                                    value={formData.courseDescription}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input
                                    id="estimatedTime"
                                    name="estimatedTime"
                                    type="text"
                                    value={formData.estimatedTime}
                                    onChange={handleChange}
                                />
                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea
                                    id="materialsNeeded"
                                    name="materialsNeeded"
                                    value={formData.materialsNeeded}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                        <button className="button" type="submit">
                            Update Course
                        </button>
                        <button
                            className="button button-secondary"
                            onClick={() => window.location.href = "index.html"}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default UpdateCourse;