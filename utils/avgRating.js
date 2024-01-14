exports.calculateAvgRating = async(ratings) => {
    // console.log(ratings);
    let total=0
    let len=0
    for(obj of ratings){
        console.log(obj.rating);
        if(obj.rating!== null){
            total += parseFloat(obj.rating)
            len++
        }
    }
    return total/len
}