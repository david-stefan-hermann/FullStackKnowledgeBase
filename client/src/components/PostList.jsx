import React, { useEffect, useState, useContext } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/esm/Image"
import Button from 'react-bootstrap/Button'
import LoadingSpinner from "./LoadingSpinner"
import { Link, useNavigate } from "react-router-dom"
import ReactMarkdown from 'react-markdown';

import axios from "axios"
import { PostContext } from "../context/postContext"
import Container from "react-bootstrap/esm/Container"

const PostList = () => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ posts, setPosts ] = useState([])
    const navigate = useNavigate()

    // loading the correct sub site
    const { replaceSpaces, setCurrentPostTitle, parentId, setParentId, setCurrentPostId, currentPostId } = useContext(PostContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/posts/", { params: { parentId: currentPostId }})
                setPosts(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
        setIsLoading(false)
    }, [currentPostId])

    const handleLink = (post) => {
        console.log("pl: l")
        navigate("/" + post._id + "/" + replaceSpaces(post.title))
    }

    return (
        <>
            { posts.length >= 0 ? <h3>Unterseiten</h3> : ""}
            { isLoading ? <LoadingSpinner></LoadingSpinner> : null }
            {posts.map(post => {
                return (
                    <Row>
                        <Col sm={12} className="ms-2 my-2 py-3 card-hover"
                        onClick={() => handleLink(post)}>
                            <Row>
                                <Col sm={5} className="ps-3">
                                    <Image src={post.image} fluid ></Image>
                                </Col>
                                <Col sm={7}>
                                    <h4 className='font-weight-light'>{post.title}</h4>
                                    <ReactMarkdown>{post.short}</ReactMarkdown>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
            )})}
        </>
    )
}

export default PostList