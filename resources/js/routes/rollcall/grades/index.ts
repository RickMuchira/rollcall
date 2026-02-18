import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RollcallController::store
* @see app/Http/Controllers/RollcallController.php:132
* @route '/rollcall/grades'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rollcall/grades',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RollcallController::store
* @see app/Http/Controllers/RollcallController.php:132
* @route '/rollcall/grades'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RollcallController::store
* @see app/Http/Controllers/RollcallController.php:132
* @route '/rollcall/grades'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RollcallController::store
* @see app/Http/Controllers/RollcallController.php:132
* @route '/rollcall/grades'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RollcallController::store
* @see app/Http/Controllers/RollcallController.php:132
* @route '/rollcall/grades'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const grades = {
    store: Object.assign(store, store),
}

export default grades