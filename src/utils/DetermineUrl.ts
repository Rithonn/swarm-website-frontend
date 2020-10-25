export const url = handleUrl();

function handleUrl() {
    if(process.env.NODE_ENV=== 'development'){
        return 'http://localhost:8000'
    }
    if(process.env.NODE_ENV === 'production'){
        return 'productionurl'
    }
}