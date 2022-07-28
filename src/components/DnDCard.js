import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'
import "./favorites.css"
import { Card } from 'react-bootstrap'
const style = {
    //border: "1px dashed gray",
    padding: "10px",
    marginBottom: "0.5rem",
    backgroundColor: "white",
    cursor: "move",
    opacity: 1
};


export const DnDCard = ({ id, title, index, moveFavorite, poster }) => {
    const ref = useRef(null)
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveFavorite(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1

    const addDefaultSrc = e => {
        e.target.src = "images/NoPosterAvailable-crop.jpeg";
    }

    const indexLength = () => {
        let indexLen = (index + 1).toString().length;
        if (indexLen == 1) {
            return "favoritesNumber favoritesNumberOneDigit"
        } else {
            return "favoritesNumber favoritesNumberTwoDigit"
        }
    }
    drag(drop(ref))


    return (

        <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
            <div>
                
                <Card className="favoritesCard">
                    <div className={indexLength()}>
                    {index + 1}
                    </div>
                    <div>
                        <Card.Img
                            className="favoritesPoster"
                            src={poster}
                            onError={addDefaultSrc}
                        />
                    </div >
                    <div className="favoritesTitle" >{title}</div>
                </Card>
            </div>
        </div>
    )
}
