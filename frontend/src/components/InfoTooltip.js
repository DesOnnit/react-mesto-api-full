export default function InfoTooltip({ isOpen, imgInfo, title, onClose }) {
    return (
        <div className={`popup ${isOpen ? 'popup_open' : ''}`}>
            <div className="popup__container">
                <div className="popup__form">
                    <div className="popup__info">
                        <img src={imgInfo} alt={imgInfo} className="popup__info_img"/>
                        <h2 className="popup__info_title">
                            {title}
                        </h2>
                        <button
                            type="button"
                            className={`popup__form-close transition-btn`}
                            onClick={onClose}>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}