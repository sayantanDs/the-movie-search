const tmdb_config = {
    
    "base_url": "http://image.tmdb.org/t/p/",
    "secure_base_url": "https://image.tmdb.org/t/p/",
    "backdrop_sizes": [
        "w300",
        "w780",
        "w1280",
        "original"
    ],
    "logo_sizes": [
        "w45",
        "w92",
        "w154",
        "w185",
        "w300",
        "w500",
        "original"
    ],
    "poster_sizes": [
        "w92",
        "w154",
        "w185",
        "w342",
        "w500",
        "w780",
        "original"
    ],
    "profile_sizes": [
        "w45",
        "w185",
        "h632",
        "original"
    ],
    "still_sizes": [
        "w92",
        "w185",
        "w300",
        "original"
    ]
}


export function get_poster_url(poster_path, bigness=1){
    bigness = (bigness>tmdb_config.poster_sizes.length-1)?tmdb_config.poster_sizes.length-1:bigness;
    if(poster_path) return `${tmdb_config.secure_base_url}${tmdb_config.poster_sizes[bigness]}${poster_path}`;
}

export function get_backdrop_url(backdrop_path, bigness=1){
    bigness = (bigness>tmdb_config.backdrop_sizes.length-1)?tmdb_config.backdrop_sizes.length-1:bigness;
    if(backdrop_path) return `${tmdb_config.secure_base_url}${tmdb_config.backdrop_sizes[bigness]}${backdrop_path}`;
}

export function get_profile_url(profile_path, bigness=0){
    bigness = (bigness>tmdb_config.profile_sizes.length-1)?tmdb_config.profile_sizes.length-1:bigness;
    if(profile_path) return `${tmdb_config.secure_base_url}${tmdb_config.profile_sizes[bigness]}${profile_path}`;
}

export function getGenreNames(id){
    const genre_map = {12: "Adventure", 14: "Fantasy", 16: "Animation", 18: "Drama", 27: "Horror", 28: "Action", 35: "Comedy", 36: "History", 37: "Western", 53: "Thriller", 80: "Crime", 99: "Documentary", 878: "SciFi", 9648: "Mystery", 10402: "Music", 10749: "Romance", 10751: "Family", 10752: "War", 10759: "Action & Adventure", 10762: "Kids", 10763: "News", 10764: "Reality", 10765: "Sci-Fi & Fantasy", 10766: "Soap", 10767: "Talk", 10768: "War & Politics", 10770: "TV Movie"}
    return (id in genre_map)? genre_map[id]: null;
}



export function format_date(date){
    if(date){
        let dd = date.substr(8,2);
        let mm = date.substr(5,2);
        let yyyy = date.substr(0,4);
        const months = ["Jan", "Feb", "March", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        let month = months[parseInt(mm)-1];
        return `${dd} ${month} ${yyyy}`;
    }
}
