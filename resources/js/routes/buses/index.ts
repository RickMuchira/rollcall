import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\BusController::index
* @see app/Http/Controllers/BusController.php:17
* @route '/buses'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/buses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BusController::index
* @see app/Http/Controllers/BusController.php:17
* @route '/buses'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusController::index
* @see app/Http/Controllers/BusController.php:17
* @route '/buses'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusController::index
* @see app/Http/Controllers/BusController.php:17
* @route '/buses'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BusController::index
* @see app/Http/Controllers/BusController.php:17
* @route '/buses'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusController::index
* @see app/Http/Controllers/BusController.php:17
* @route '/buses'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusController::index
* @see app/Http/Controllers/BusController.php:17
* @route '/buses'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\BusController::create
* @see app/Http/Controllers/BusController.php:31
* @route '/buses/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/buses/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BusController::create
* @see app/Http/Controllers/BusController.php:31
* @route '/buses/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusController::create
* @see app/Http/Controllers/BusController.php:31
* @route '/buses/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusController::create
* @see app/Http/Controllers/BusController.php:31
* @route '/buses/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BusController::create
* @see app/Http/Controllers/BusController.php:31
* @route '/buses/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusController::create
* @see app/Http/Controllers/BusController.php:31
* @route '/buses/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusController::create
* @see app/Http/Controllers/BusController.php:31
* @route '/buses/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\BusController::store
* @see app/Http/Controllers/BusController.php:39
* @route '/buses'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/buses',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BusController::store
* @see app/Http/Controllers/BusController.php:39
* @route '/buses'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusController::store
* @see app/Http/Controllers/BusController.php:39
* @route '/buses'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BusController::store
* @see app/Http/Controllers/BusController.php:39
* @route '/buses'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BusController::store
* @see app/Http/Controllers/BusController.php:39
* @route '/buses'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\BusController::show
* @see app/Http/Controllers/BusController.php:59
* @route '/buses/{bus}'
*/
export const show = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/buses/{bus}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BusController::show
* @see app/Http/Controllers/BusController.php:59
* @route '/buses/{bus}'
*/
show.url = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bus: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { bus: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            bus: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        bus: typeof args.bus === 'object'
        ? args.bus.id
        : args.bus,
    }

    return show.definition.url
            .replace('{bus}', parsedArgs.bus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusController::show
* @see app/Http/Controllers/BusController.php:59
* @route '/buses/{bus}'
*/
show.get = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusController::show
* @see app/Http/Controllers/BusController.php:59
* @route '/buses/{bus}'
*/
show.head = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BusController::show
* @see app/Http/Controllers/BusController.php:59
* @route '/buses/{bus}'
*/
const showForm = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusController::show
* @see app/Http/Controllers/BusController.php:59
* @route '/buses/{bus}'
*/
showForm.get = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusController::show
* @see app/Http/Controllers/BusController.php:59
* @route '/buses/{bus}'
*/
showForm.head = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\BusController::edit
* @see app/Http/Controllers/BusController.php:73
* @route '/buses/{bus}/edit'
*/
export const edit = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/buses/{bus}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BusController::edit
* @see app/Http/Controllers/BusController.php:73
* @route '/buses/{bus}/edit'
*/
edit.url = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bus: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { bus: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            bus: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        bus: typeof args.bus === 'object'
        ? args.bus.id
        : args.bus,
    }

    return edit.definition.url
            .replace('{bus}', parsedArgs.bus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusController::edit
* @see app/Http/Controllers/BusController.php:73
* @route '/buses/{bus}/edit'
*/
edit.get = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusController::edit
* @see app/Http/Controllers/BusController.php:73
* @route '/buses/{bus}/edit'
*/
edit.head = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BusController::edit
* @see app/Http/Controllers/BusController.php:73
* @route '/buses/{bus}/edit'
*/
const editForm = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusController::edit
* @see app/Http/Controllers/BusController.php:73
* @route '/buses/{bus}/edit'
*/
editForm.get = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusController::edit
* @see app/Http/Controllers/BusController.php:73
* @route '/buses/{bus}/edit'
*/
editForm.head = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\BusController::update
* @see app/Http/Controllers/BusController.php:83
* @route '/buses/{bus}'
*/
export const update = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/buses/{bus}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\BusController::update
* @see app/Http/Controllers/BusController.php:83
* @route '/buses/{bus}'
*/
update.url = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bus: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { bus: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            bus: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        bus: typeof args.bus === 'object'
        ? args.bus.id
        : args.bus,
    }

    return update.definition.url
            .replace('{bus}', parsedArgs.bus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusController::update
* @see app/Http/Controllers/BusController.php:83
* @route '/buses/{bus}'
*/
update.put = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\BusController::update
* @see app/Http/Controllers/BusController.php:83
* @route '/buses/{bus}'
*/
update.patch = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\BusController::update
* @see app/Http/Controllers/BusController.php:83
* @route '/buses/{bus}'
*/
const updateForm = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BusController::update
* @see app/Http/Controllers/BusController.php:83
* @route '/buses/{bus}'
*/
updateForm.put = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BusController::update
* @see app/Http/Controllers/BusController.php:83
* @route '/buses/{bus}'
*/
updateForm.patch = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\BusController::destroy
* @see app/Http/Controllers/BusController.php:104
* @route '/buses/{bus}'
*/
export const destroy = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/buses/{bus}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\BusController::destroy
* @see app/Http/Controllers/BusController.php:104
* @route '/buses/{bus}'
*/
destroy.url = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bus: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { bus: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            bus: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        bus: typeof args.bus === 'object'
        ? args.bus.id
        : args.bus,
    }

    return destroy.definition.url
            .replace('{bus}', parsedArgs.bus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusController::destroy
* @see app/Http/Controllers/BusController.php:104
* @route '/buses/{bus}'
*/
destroy.delete = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\BusController::destroy
* @see app/Http/Controllers/BusController.php:104
* @route '/buses/{bus}'
*/
const destroyForm = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BusController::destroy
* @see app/Http/Controllers/BusController.php:104
* @route '/buses/{bus}'
*/
destroyForm.delete = (args: { bus: number | { id: number } } | [bus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const buses = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default buses