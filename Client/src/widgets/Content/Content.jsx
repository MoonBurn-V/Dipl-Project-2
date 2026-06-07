import './Content.scss'
import { useState, useRef } from 'react'
import Button from '@/shared/Button/Button'
import Icon from '@/shared/Icon/Icon'
import prev from '../../../assets/images/videoPoster.png'

export const Content = ({ content, video }) => {
    const [showControls, setShowControls] = useState(false)
    const videoRef = useRef(null)

    const videoURL = video ? `/static/video/${video}` : null

    const handlePlayVideo = () => {
        videoRef.current.play()
        setShowControls(true)
    }

    return (
        <section className="content">
            <div className="content__container container">
                {content && (
                    <div className="content__lecture">
                        {content.map((item, index) => (
                            <div key={index}>
                                <div className="content__lecture-title h4">
                                    {item.title}
                                </div>
                                <p>{item.paragraph}</p>
                            </div>
                        ))}
                    </div>
                )}

                {video && (
                    <div className="content__video">
                        <video
                            ref={videoRef}
                            className="content__video-player"
                            poster={prev}
                            src={videoURL}
                            controls={showControls}
                            onClick={!showControls ? handlePlayVideo : undefined}
                        />
                        <div className="content__video-controls">
                            {!showControls && (
                                <Button
                                    className="content__video-button"
                                    onClick={handlePlayVideo}
                                >
                                    <Icon name="play" />
                                </Button>                               
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}