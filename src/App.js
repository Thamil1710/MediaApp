// import { Routes, Route, Link } from "react-router-dom";
import { format } from "date-fns";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import Newpost from "./Newpost";
import Postpage from "./Postpage";
// import Post from "./Post";
// import PageLayout from "./PageLayout";
// import Paper from "./Paper";
import { useState } from "react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Reading books"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Web3 Global submit next Weak"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Always Playing cricket in my School days"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non opti"
    }
  ]);
  const [search,setSearch] = useState('')
  const [searchResults,setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState("")
  const [postBody, setPostBody] = useState("")
  const navigate = useNavigate()


  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])



  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate("/")
  }

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    navigate("/")
  }





  return (
    <div className="App">
      <Header title="Let Post Your Thoughts"/>
      <Nav 
      search={search}
      setSearch={setSearch}
      />

      <Routes>
       <Route path="/" element={<Home posts = {searchResults}/>} />

      <Route path="post">
      <Route index element={<Newpost postTitle={postTitle} setPostTitle={setPostTitle} postBody={postBody} setPostBody={setPostBody} handleSubmit={handleSubmit} />} /> 
      <Route path=":id" element={<Postpage handleDelete={handleDelete} posts={posts}/> } /> 
      </Route>

      <Route path="about" element={<About />} />
      <Route path="*" element={<Missing/>} />


      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
