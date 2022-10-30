/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect  } from 'react'
import {getImages} from "../../services/api"
import Searchbar from './Searchbar/Searchbar'
import Loader from './Loader/Loader'
import ImageGallery from './ImageGallery/ImageGallery'
import Modal from './Modal/Modal'
import Button from './Button/Button'

        
export default function ImageSearch() {

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [items, setItems] = useState([]);
    const [totalHits, setTotalHits] = useState(0);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [largeImageURL, setLargeImageURL] = useState("");
    const [tags, setTags] = useState("");
    const [error, setError] = useState(null);

    const per_page = 12;

    const loadeMore = () => {
        setPage((prevPage) => prevPage + 1
        )
    }
    const isImages = Boolean(items.length);

    useEffect(() => {
        if (!search) { return };
        const fetchImages = async () => {
            setLoading(true);
            try {
                const data = await getImages(search, page);
                setTotalHits(data.totalHits);
                setItems((prevItems) => { return [...prevItems, ...data.hits] });
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false)
            }
        }
        fetchImages();
    }, [page]);

    useEffect(() => {
        if (!search) { return };
        setItems([])
    const fetchImages = async () => {
        setLoading(true);
        try {
            const data = await getImages(search, page);
            setTotalHits(data.totalHits);
            setItems((prevItems) => { return [...prevItems, ...data.hits] });
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false)
        }
    }
    fetchImages();
    }, [search]);
    
    const onSearch = (search) => {
        setSearch(search)
    }

    const openModal = ({largeImageURL, tags}) => {
        setModalOpen(true);
        setLargeImageURL(largeImageURL);
        setTags(tags);
    }

    const closeModal = () => {
        setModalOpen(false);
        setLargeImageURL('');
        setTags('');
    }
   
  return (
        <div>
            {modalOpen && <Modal onClose={closeModal}
                 largeImageURL={largeImageURL} tags={tags} />}
            {error && <p>Будь ласка спробуйте пізніше...</p>}
            <Searchbar onSubmit={onSearch} />
            {isImages && <ImageGallery items={items} onClick={openModal} />}
            {loading && <Loader />}
            {isImages && page * per_page < totalHits ? (
                <Button onClick={loadeMore} />
                ) : (
                ''
            )}
            
        </div>
    )
}

