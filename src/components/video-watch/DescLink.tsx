import React from "react"

import "./DescLink.scss"

type LinkType = {
    href: string,
    span: string,
    img: React.ReactElement<any,any>,
    division?: string
}

interface DescLinkProps {
    href: string
}

const DescLink: React.FC<DescLinkProps> = ({ href }) => {
    let type: LinkType | null = null

    const types: LinkType[]= [
        {
            href: "youtu.be",
            span: "YouTube",
            img: <img alt="youtube" src="https://www.gstatic.com/youtube/img/watch/yt_favicon.png" />,
            division: "•"
        },
        {
            href: "youtube.com",
            span: "YouTube",
            img: <img alt="youtube" src="https://www.gstatic.com/youtube/img/watch/yt_favicon.png" />,
        },
        {
            href: "discord.gg",
            span: "discord",
            img: <img alt="discord" src="https://www.gstatic.com/youtube/img/watch/social_media/discord_1x.png" />
        },
        {
            href: "instagram.com",
            span: "Instagram",
            img: <img alt="instagram" src="https://www.gstatic.com/youtube/img/watch/social_media/instagram_1x.png" />
        },
        {
            href: "twitter.com",
            span: "Twitter",
            img: <img alt="twitter" src="https://www.gstatic.com/youtube/img/watch/social_media/twitter_1x_v2.png" />
        },
        {
            href: "facebook.com",
            span: "Facebook",
            img: <img alt="facebook" src="https://www.gstatic.com/youtube/img/watch/social_media/facebook_1x.png" />
        },
        {
            href: "twitch.tv",
            span: "Twitch",
            img: <img alt="twitch" src="https://www.gstatic.com/youtube/img/watch/social_media/twitch_1x.png" />
        }
    ]

    for(const item of types) {
        if(href.includes(item.href)) {
            type = item
            break
        }
    }

    return type ? <a target="_blank" className="description-link" href={href}>{type.img}&nbsp;<span>{type.division ? type.division : "/"} {type.span}</span></a> : <a className="link-not-found" href={href}>{href}</a>
}

export default DescLink