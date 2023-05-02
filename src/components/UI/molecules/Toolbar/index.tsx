import Button from 'react-bootstrap/Button';
import { IToolbarProp } from "./type"
import "./style.scss"

const Toolbar = ({ openBookModalHandler }: IToolbarProp) => {
    return (
        <div className='toolbar-container'>
            <Button variant="primary" onClick={openBookModalHandler}>
                Book
            </Button>
        </div>
    )
}

export default Toolbar