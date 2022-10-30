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


// export default class ImageSearch extends Component {
    // state = {
        // search: "",
        // page: 1,
        // per_page: 12,
        // items: [],
        // totalHits: 0,
        // loading: false,
        // error: null,
        // modalOpen: false,
    //     modalContent: {
    //         largeImageURL: "",
    //         tags: "",
    //     }
    // }

    // componentDidUpdate(_, prevState) {
    //     const { search, page } = this.state;
        // if (search && page !== prevState.page) {
        //     this.fetchImages(search, page);
        // } else if (search && prevState.search !== search) {
        //     this.setState({ items: [] });
        //     this.fetchImages(search, page); 
        // }
    // }

    // async fetchImages() {
    //     const { search, page,} = this.state;
    //     this.setState({ loading: true, });
    //     try {
    //         const data = await getImages(search, page);
    //         this.setState({ totalHits: data.totalHits });
    //         this.setState(({ items }) => {
    //             return {
    //                 items: [...items, ...data.hits]
    //             }
    //         })
    //     } catch (error) {
    //         this.setState({error})
    //     } finally {
    //         this.setState({ loading: false, });
    //     }
    // }

    // onSearch = ({search}) => {
    //     this.setState({ search })
    // }
    // openModal = (modalContent) => {
    //         this.setState({
    //         modalOpen: true,
    //         modalContent,
    //     }) 
           
    // }
    // closeModal = () => {
    //     this.setState({
    //         modalOpen: false,
    //         modalContent: {
    //             largeImageURL: "",
    //             tags: "",
    //         }
    //     }) 
    // }
    // loadeMore = () => {
    //     this.setState(({ page }) => {
    //         return {
    //             page: page + 1
    //         }
    //     }
    // )}

    // render() {
        // const { items, loading, error, modalOpen, modalContent, page, per_page, totalHits } = this.state; 
        // const { loadeMore, onSearch, openModal, closeModal } = this;
        // const isImages = Boolean(items.length);
    //         return (
    //             <div>
    //                 {modalOpen && <Modal onClose={closeModal}>
    //                     <img src={modalContent.largeImageURL} alt={modalContent.tags}/>
    //                     </Modal>}
    //                 {error && <p>Будь ласка спробуйте пізніше...</p>}
    //                 <Searchbar onSubmit={onSearch} />
    //                 {isImages && <ImageGallery items={items} onClick={openModal} />}
    //                 {loading && <Loader />}
    //                 {isImages && page * per_page < totalHits ? (
    //                     <Button onClick={loadeMore} />
    //                     ) : (
    //                     ''
    //                 )}
                    
    //             </div>
    // )
//   }
// }

