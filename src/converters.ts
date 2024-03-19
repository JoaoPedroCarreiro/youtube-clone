const insert = (str: string, i: number, substr: string): string => str.substring(0, i) + substr + str.substring(i)

const months: string[] = ["Jan", "Fev", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct","Nov", "Dec"]

function viewsMini(views: number, fixed: number = 1): string {
    if(views >= 1000000) return (views / 1000000) < 10 ? `${(views / 1000000).toFixed(fixed)}M` : `${Math.floor((views / 1000000))}M`
    if(views >= 1000) return (views / 1000) < 10 ? `${(views / 1000).toFixed(fixed)}K` : `${Math.floor((views / 1000))}K`
    return `${views}`
}

function timeAgo(time: number): string {
    const arr: number[] = [1000, 60, 60, 24, 7, 4, 12]
    const ago: string[] = ["second", "minute", "hour", "day", "week", "month", "year"]

    let newTime: number = time
    let curAgo: string = ago[0]

    for(let i: number = 0; i <= 6; i++) {
        newTime *= 1 / arr[i]

        if(newTime <= 1) {
            newTime *= arr[i]
            break
        }

        curAgo = ago[i]
    }

    return `${Math.floor(newTime)} ${curAgo}${Math.floor(newTime) > 1 ? "s" : ""} ago`
}

function normalDate(str: string): string {
    const splitted: string[] = str.split("T")[0].split("-")

    const year: string = splitted[0]
    const month: string = months[Number(splitted[1])]
    const day: string = String(Number(splitted[2]))

    return `${month} ${day}, ${year}`
}

function normalViews(views: string): string {
    let str: string = views
    
    for(let i: number = 0; i < Math.floor((views.length - 1) / 3); i++) {
        str = insert(str, ((views.length - 1) % 3) + (1 * (i + 1)) + (3 * i), ",")
    }

    return str
}

function normalizeString(str: string): string {
    return str.split("%20").join(" ")
}

export { viewsMini }
export { timeAgo }
export { normalDate }
export { normalViews }
export { normalizeString }