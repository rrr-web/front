import { useState, useEffect } from "react";

export function Data() {
    const [data, setData] = useState([]); // State to store the fetched data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchData = async () => {
            try {
                const endPoint = 'http://localhost:3000/formService';
                const response = await fetch(endPoint, {
                    method: 'GET'
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await response.json();
                setData(result); // Set the fetched data
                setLoading(false); // Set loading to false after data is fetched
            } catch (err) {
                setError(err.message); // Set error message if fetching fails
                setLoading(false); // Set loading to false even if there's an error
            }
        };

        fetchData(); // Call the async function
    }, []); // Empty dependency array ensures this runs once when the component mounts

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error: {error}</h1>;

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Unit</th>
                        <th>Pm</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Informasi</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((content) => (
                        <tr key={content.id}> {/* Added key to each row */}
                            <td>{content.id}</td> {/* Render id */}
                            <td>{content.unit}</td> {/* Render unit */}
                            <td>{content.pm}</td> {/* Render pm */}
                            <td>{new Date(content.start).toLocaleString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</td> {/* Render start */}
                            <td>{new Date(content.end).toLocaleString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</td> {/* Render end */}
                            <td>{content.information}</td> {/* Render informasi */}
                            <td>
                                <button>Edit</button>
                                <button>Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
