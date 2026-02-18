import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\GradeController::index
* @see app/Http/Controllers/GradeController.php:17
* @route '/grades'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/grades',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GradeController::index
* @see app/Http/Controllers/GradeController.php:17
* @route '/grades'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GradeController::index
* @see app/Http/Controllers/GradeController.php:17
* @route '/grades'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GradeController::index
* @see app/Http/Controllers/GradeController.php:17
* @route '/grades'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\GradeController::index
* @see app/Http/Controllers/GradeController.php:17
* @route '/grades'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GradeController::index
* @see app/Http/Controllers/GradeController.php:17
* @route '/grades'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GradeController::index
* @see app/Http/Controllers/GradeController.php:17
* @route '/grades'
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
* @see \App\Http\Controllers\GradeController::create
* @see app/Http/Controllers/GradeController.php:0
* @route '/grades/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/grades/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GradeController::create
* @see app/Http/Controllers/GradeController.php:0
* @route '/grades/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GradeController::create
* @see app/Http/Controllers/GradeController.php:0
* @route '/grades/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GradeController::create
* @see app/Http/Controllers/GradeController.php:0
* @route '/grades/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\GradeController::create
* @see app/Http/Controllers/GradeController.php:0
* @route '/grades/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GradeController::create
* @see app/Http/Controllers/GradeController.php:0
* @route '/grades/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GradeController::create
* @see app/Http/Controllers/GradeController.php:0
* @route '/grades/create'
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
* @see \App\Http\Controllers\GradeController::store
* @see app/Http/Controllers/GradeController.php:29
* @route '/grades'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/grades',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\GradeController::store
* @see app/Http/Controllers/GradeController.php:29
* @route '/grades'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GradeController::store
* @see app/Http/Controllers/GradeController.php:29
* @route '/grades'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\GradeController::store
* @see app/Http/Controllers/GradeController.php:29
* @route '/grades'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\GradeController::store
* @see app/Http/Controllers/GradeController.php:29
* @route '/grades'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\GradeController::show
* @see app/Http/Controllers/GradeController.php:0
* @route '/grades/{grade}'
*/
export const show = (args: { grade: string | number } | [grade: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/grades/{grade}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GradeController::show
* @see app/Http/Controllers/GradeController.php:0
* @route '/grades/{grade}'
*/
show.url = (args: { grade: string | number } | [grade: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { grade: args }
    }

    if (Array.isArray(args)) {
        args = {
            grade: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        grade: args.grade,
    }

    return show.definition.url
            .replace('{grade}', parsedArgs.grade.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GradeController::show
* @see app/Http/Controllers/GradeController.php:0
* @route '/grades/{grade}'
*/
show.get = (args: { grade: string | number } | [grade: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GradeController::show
* @see app/Http/Controllers/GradeController.php:0
* @route '/grades/{grade}'
*/
show.head = (args: { grade: string | number } | [grade: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\GradeController::show
* @see app/Http/Controllers/GradeController.php:0
* @route '/grades/{grade}'
*/
const showForm = (args: { grade: string | number } | [grade: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GradeController::show
* @see app/Http/Controllers/GradeController.php:0
* @route '/grades/{grade}'
*/
showForm.get = (args: { grade: string | number } | [grade: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GradeController::show
* @see app/Http/Controllers/GradeController.php:0
* @route '/grades/{grade}'
*/
showForm.head = (args: { grade: string | number } | [grade: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\GradeController::edit
* @see app/Http/Controllers/GradeController.php:0
* @route '/grades/{grade}/edit'
*/
export const edit = (args: { grade: string | number } | [grade: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/grades/{grade}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GradeController::edit
* @see app/Http/Controllers/GradeController.php:0
* @route '/grades/{grade}/edit'
*/
edit.url = (args: { grade: string | number } | [grade: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { grade: args }
    }

    if (Array.isArray(args)) {
        args = {
            grade: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        grade: args.grade,
    }

    return edit.definition.url
            .replace('{grade}', parsedArgs.grade.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GradeController::edit
* @see app/Http/Controllers/GradeController.php:0
* @route '/grades/{grade}/edit'
*/
edit.get = (args: { grade: string | number } | [grade: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GradeController::edit
* @see app/Http/Controllers/GradeController.php:0
* @route '/grades/{grade}/edit'
*/
edit.head = (args: { grade: string | number } | [grade: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\GradeController::edit
* @see app/Http/Controllers/GradeController.php:0
* @route '/grades/{grade}/edit'
*/
const editForm = (args: { grade: string | number } | [grade: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GradeController::edit
* @see app/Http/Controllers/GradeController.php:0
* @route '/grades/{grade}/edit'
*/
editForm.get = (args: { grade: string | number } | [grade: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GradeController::edit
* @see app/Http/Controllers/GradeController.php:0
* @route '/grades/{grade}/edit'
*/
editForm.head = (args: { grade: string | number } | [grade: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\GradeController::update
* @see app/Http/Controllers/GradeController.php:40
* @route '/grades/{grade}'
*/
export const update = (args: { grade: number | { id: number } } | [grade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/grades/{grade}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\GradeController::update
* @see app/Http/Controllers/GradeController.php:40
* @route '/grades/{grade}'
*/
update.url = (args: { grade: number | { id: number } } | [grade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { grade: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { grade: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            grade: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        grade: typeof args.grade === 'object'
        ? args.grade.id
        : args.grade,
    }

    return update.definition.url
            .replace('{grade}', parsedArgs.grade.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GradeController::update
* @see app/Http/Controllers/GradeController.php:40
* @route '/grades/{grade}'
*/
update.put = (args: { grade: number | { id: number } } | [grade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\GradeController::update
* @see app/Http/Controllers/GradeController.php:40
* @route '/grades/{grade}'
*/
update.patch = (args: { grade: number | { id: number } } | [grade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\GradeController::update
* @see app/Http/Controllers/GradeController.php:40
* @route '/grades/{grade}'
*/
const updateForm = (args: { grade: number | { id: number } } | [grade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\GradeController::update
* @see app/Http/Controllers/GradeController.php:40
* @route '/grades/{grade}'
*/
updateForm.put = (args: { grade: number | { id: number } } | [grade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\GradeController::update
* @see app/Http/Controllers/GradeController.php:40
* @route '/grades/{grade}'
*/
updateForm.patch = (args: { grade: number | { id: number } } | [grade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\GradeController::destroy
* @see app/Http/Controllers/GradeController.php:51
* @route '/grades/{grade}'
*/
export const destroy = (args: { grade: number | { id: number } } | [grade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/grades/{grade}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\GradeController::destroy
* @see app/Http/Controllers/GradeController.php:51
* @route '/grades/{grade}'
*/
destroy.url = (args: { grade: number | { id: number } } | [grade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { grade: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { grade: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            grade: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        grade: typeof args.grade === 'object'
        ? args.grade.id
        : args.grade,
    }

    return destroy.definition.url
            .replace('{grade}', parsedArgs.grade.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GradeController::destroy
* @see app/Http/Controllers/GradeController.php:51
* @route '/grades/{grade}'
*/
destroy.delete = (args: { grade: number | { id: number } } | [grade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\GradeController::destroy
* @see app/Http/Controllers/GradeController.php:51
* @route '/grades/{grade}'
*/
const destroyForm = (args: { grade: number | { id: number } } | [grade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\GradeController::destroy
* @see app/Http/Controllers/GradeController.php:51
* @route '/grades/{grade}'
*/
destroyForm.delete = (args: { grade: number | { id: number } } | [grade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const grades = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default grades