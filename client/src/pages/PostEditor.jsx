import React, { useEffect, useState, useContext } from "react"
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/esm/Image"
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import axios from "axios"
import { Link, useLocation } from "react-router-dom"
import PostList from "../components/PostList"
import TableOfContent from "../components/TableOfContent"
import OnSitePost from "../components/OnSitePost"
import SiteLocation from "../components/SiteLocation"
import { AuthContext } from '../context/authContext';
import ReactMarkdown from 'react-markdown';
import LoadingSpinner from "../components/LoadingSpinner"

const PostEditor = () => {
    const { currentUser } = useContext(AuthContext)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ updater, setUpdater ] = useState(false)
    const [ post, setPost ] = useState({})
    const [ newPost, setNewPost ] = useState({})

    const postIdFromUrl = useLocation().pathname.split("/")[2]
    
    console.log("PE: " + typeof postIdFromUrl)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/posts/" + postIdFromUrl)
                setPost(res.data)
                setNewPost(res.data)
                console.log(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
        setIsLoading(false)
    }, [])

    useEffect(() => {
        const updatePreview = async () => {
            const preview_private = document.getElementById("edit-private")
            const preview_title = document.getElementById("edit-title")
            const preview_image = document.getElementById("edit-image")
            const preview_short = document.getElementById("edit-short")
            const preview_content = document.getElementById("edit-content")

            console.log("PE : " + newPost)
        }
    }, [updater])

    function handleChangeTitle() {
        const thisPost = newPost
        const elem = document.getElementById("edit-title")
        thisPost.title = elem.value
        setNewPost(thisPost)
        setUpdater(!updater)
    }

    function handleChangePrivate() {
        const thisPost = newPost
        const elem = document.getElementById("edit-private")
        thisPost.is_private = elem.checked
        setNewPost(thisPost)
        setUpdater(!updater)
    }

    function handleChangeImage() {
        const thisPost = newPost
        const elem = document.getElementById("edit-image")
        thisPost.image = elem.value
        setNewPost(thisPost)
        setUpdater(!updater)
    }

    function handleChangeShort() {
        const thisPost = newPost
        const elem = document.getElementById("edit-short")
        thisPost.short = elem.value
        setNewPost(thisPost)
        setUpdater(!updater)
    }

    function handleChangeContent() {
        const thisPost = newPost
        const elem = document.getElementById("edit-content")
        thisPost.content = elem.value
        setNewPost(thisPost)
        setUpdater(!updater)
    }

    return (
        <>
            { isLoading ? <LoadingSpinner></LoadingSpinner> : null }
            <Row className="bg-dark text-light p-5 m-3 rounded">
                <Col sm={6}>
                    <Form.Check
                        label="privat?"
                        id="edit-private"
                        type="switch"
                        data-bs-theme="dark"
                        className="mb-4"
                        checked={post.is_private}
                        onChange={() => handleChangePrivate()}
                    />

                    <FloatingLabel 
                    label="Titel" 
                    controlId="edit-title" 
                    data-bs-theme="dark"
                    className="mb-4"
                    onChange={() => handleChangeTitle()}
                    >
                        <Form.Control
                        value={post.title}
                        className="box-shadow text-input-field"
                        as="textarea"
                        style={{ height: '100px' }}
                        />
                    </FloatingLabel>

                    <FloatingLabel 
                    label="Titelbild" 
                    controlId="edit-image" 
                    data-bs-theme="dark"
                    className="mb-4"
                    onChange={() => handleChangeImage()}
                    >
                        <Form.Control
                        value={post.image}
                        className="box-shadow text-input-field"
                        as="textarea"
                        style={{ height: '100px' }}
                        />
                    </FloatingLabel>

                    <FloatingLabel 
                    label="Beschreibung" 
                    controlId="edit-short" 
                    data-bs-theme="dark"
                    className="mb-4"
                    onChange={() => handleChangeShort()}
                    >
                        <Form.Control
                        value={post.short}
                        className="box-shadow text-input-field"
                        as="textarea"
                        style={{ height: '100px' }}
                        />
                    </FloatingLabel>

                    <FloatingLabel 
                    label="Inhalt" 
                    controlId="edit-content" 
                    data-bs-theme="dark"
                    onChange={() => handleChangeContent()}
                    >
                        <Form.Control
                        value={post.content}
                        className="box-shadow text-input-field"
                        as="textarea"
                        style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                </Col>
                <Col sm={6}>
                <h4 className="mb-4">{newPost?.title}</h4>
                {newPost?.image ?
                    <Image
                    className="mb-4"
                    src={newPost.image}
                    fluid></Image>
                    : "Titelbild"
                }
                { newPost?.short ? 
                    <>
                    <Container className="box-shadow px-4 secondary-color rounded-top">
                        Beschreibung
                    </Container>
                    <Container className="box-shadow p-4 mb-4 rounded-bottom">
                        <ReactMarkdown>{newPost?.short}</ReactMarkdown>
                    </Container>
                    </>
                    :
                    <p>Hier wird die Beschreibung angezeigt</p>
                }
                { newPost?.content ? 
                    <>
                    <Container className="box-shadow px-4 secondary-color rounded-top">
                        Inhalt
                    </Container>
                    <Container className="box-shadow p-4 rounded-bottom">
                        <ReactMarkdown>{newPost?.content}</ReactMarkdown>
                    </Container>
                    </>
                    :
                    <p>Hier wird der Inhalt angezeigt</p>
                }
                </Col>
            
            </Row>
        </>
    )
}

export default PostEditor