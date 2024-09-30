import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import ReactPaginate from 'react-paginate';
import "./Pagination.css"; // Import the CSS file

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [blogsPerPage] = useState(5);

    const fetchBlogs = async () => {
        const res = await fetch('http://localhost:8000/api/blogs');
        const result = await res.json();
        setBlogs(result.data);
    };

    const searchBlogs = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:8000/api/blogs?keyword=' + keyword);
        const result = await res.json();
        setBlogs(result.data);
        setCurrentPage(0);
    };

    const resetSearch = () => {
        fetchBlogs();
        setKeyword('');
        setCurrentPage(0);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const indexOfLastBlog = (currentPage + 1) * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    return (
        <div className='container'>
            <div className="d-flex justify-content-center pt-5">
                <form onSubmit={(e) => searchBlogs(e)}>
                    <div className='d-flex'>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className='form-control'
                            placeholder='Search Blogs'
                        />
                        <button className='btn btn-dark ms-2'>Search</button>
                        <button type='button' onClick={() => resetSearch()} className='btn btn-success ms-2'>Reset</button>
                    </div>
                </form>
            </div>
            <div className="d-flex justify-content-between pt-5 mb-4">
                <a href='/create' className='btn btn-dark'>Create</a>
                <a href='/dashboard' className='btn btn-dark'>Back</a>
            </div>
            <div className='row'>
                {currentBlogs.length > 0 ? (
                    currentBlogs.map((blog) => (
                        <BlogCard blogs={blogs} setBlogs={setBlogs} blog={blog} key={blog.id} />
                    ))
                ) : (
                    <p>No blogs found.</p>
                )}
            </div>
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={Math.ceil(blogs.length / blogsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
                previousClassName={'page-item'}
                nextClassName={'page-item'}
                pageClassName={'page-item'}
                disabledClassName={'disabled'}
            />
        </div>
    );
};

export default Blogs;
