import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RollcallController::index
* @see app/Http/Controllers/RollcallController.php:22
* @route '/rollcall'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/rollcall',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RollcallController::index
* @see app/Http/Controllers/RollcallController.php:22
* @route '/rollcall'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RollcallController::index
* @see app/Http/Controllers/RollcallController.php:22
* @route '/rollcall'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RollcallController::index
* @see app/Http/Controllers/RollcallController.php:22
* @route '/rollcall'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RollcallController::index
* @see app/Http/Controllers/RollcallController.php:22
* @route '/rollcall'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RollcallController::index
* @see app/Http/Controllers/RollcallController.php:22
* @route '/rollcall'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RollcallController::index
* @see app/Http/Controllers/RollcallController.php:22
* @route '/rollcall'
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
* @see \App\Http\Controllers\RollcallController::store
* @see app/Http/Controllers/RollcallController.php:56
* @route '/rollcall'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rollcall',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RollcallController::store
* @see app/Http/Controllers/RollcallController.php:56
* @route '/rollcall'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RollcallController::store
* @see app/Http/Controllers/RollcallController.php:56
* @route '/rollcall'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RollcallController::store
* @see app/Http/Controllers/RollcallController.php:56
* @route '/rollcall'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RollcallController::store
* @see app/Http/Controllers/RollcallController.php:56
* @route '/rollcall'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\RollcallController::update
* @see app/Http/Controllers/RollcallController.php:89
* @route '/rollcall/{student}'
*/
export const update = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/rollcall/{student}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\RollcallController::update
* @see app/Http/Controllers/RollcallController.php:89
* @route '/rollcall/{student}'
*/
update.url = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { student: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            student: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        student: typeof args.student === 'object'
        ? args.student.id
        : args.student,
    }

    return update.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RollcallController::update
* @see app/Http/Controllers/RollcallController.php:89
* @route '/rollcall/{student}'
*/
update.put = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\RollcallController::update
* @see app/Http/Controllers/RollcallController.php:89
* @route '/rollcall/{student}'
*/
const updateForm = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RollcallController::update
* @see app/Http/Controllers/RollcallController.php:89
* @route '/rollcall/{student}'
*/
updateForm.put = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\RollcallController::destroy
* @see app/Http/Controllers/RollcallController.php:123
* @route '/rollcall/{student}'
*/
export const destroy = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/rollcall/{student}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RollcallController::destroy
* @see app/Http/Controllers/RollcallController.php:123
* @route '/rollcall/{student}'
*/
destroy.url = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { student: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            student: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        student: typeof args.student === 'object'
        ? args.student.id
        : args.student,
    }

    return destroy.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RollcallController::destroy
* @see app/Http/Controllers/RollcallController.php:123
* @route '/rollcall/{student}'
*/
destroy.delete = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\RollcallController::destroy
* @see app/Http/Controllers/RollcallController.php:123
* @route '/rollcall/{student}'
*/
const destroyForm = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RollcallController::destroy
* @see app/Http/Controllers/RollcallController.php:123
* @route '/rollcall/{student}'
*/
destroyForm.delete = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\RollcallController::storeGrade
* @see app/Http/Controllers/RollcallController.php:134
* @route '/rollcall/grades'
*/
export const storeGrade = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeGrade.url(options),
    method: 'post',
})

storeGrade.definition = {
    methods: ["post"],
    url: '/rollcall/grades',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RollcallController::storeGrade
* @see app/Http/Controllers/RollcallController.php:134
* @route '/rollcall/grades'
*/
storeGrade.url = (options?: RouteQueryOptions) => {
    return storeGrade.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RollcallController::storeGrade
* @see app/Http/Controllers/RollcallController.php:134
* @route '/rollcall/grades'
*/
storeGrade.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeGrade.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RollcallController::storeGrade
* @see app/Http/Controllers/RollcallController.php:134
* @route '/rollcall/grades'
*/
const storeGradeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeGrade.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RollcallController::storeGrade
* @see app/Http/Controllers/RollcallController.php:134
* @route '/rollcall/grades'
*/
storeGradeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeGrade.url(options),
    method: 'post',
})

storeGrade.form = storeGradeForm

/**
* @see \App\Http\Controllers\RollcallController::storeBus
* @see app/Http/Controllers/RollcallController.php:145
* @route '/rollcall/buses'
*/
export const storeBus = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeBus.url(options),
    method: 'post',
})

storeBus.definition = {
    methods: ["post"],
    url: '/rollcall/buses',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RollcallController::storeBus
* @see app/Http/Controllers/RollcallController.php:145
* @route '/rollcall/buses'
*/
storeBus.url = (options?: RouteQueryOptions) => {
    return storeBus.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RollcallController::storeBus
* @see app/Http/Controllers/RollcallController.php:145
* @route '/rollcall/buses'
*/
storeBus.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeBus.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RollcallController::storeBus
* @see app/Http/Controllers/RollcallController.php:145
* @route '/rollcall/buses'
*/
const storeBusForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeBus.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RollcallController::storeBus
* @see app/Http/Controllers/RollcallController.php:145
* @route '/rollcall/buses'
*/
storeBusForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeBus.url(options),
    method: 'post',
})

storeBus.form = storeBusForm

/**
* @see \App\Http\Controllers\RollcallController::print
* @see app/Http/Controllers/RollcallController.php:156
* @route '/rollcall/print'
*/
export const print = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(options),
    method: 'get',
})

print.definition = {
    methods: ["get","head"],
    url: '/rollcall/print',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RollcallController::print
* @see app/Http/Controllers/RollcallController.php:156
* @route '/rollcall/print'
*/
print.url = (options?: RouteQueryOptions) => {
    return print.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RollcallController::print
* @see app/Http/Controllers/RollcallController.php:156
* @route '/rollcall/print'
*/
print.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RollcallController::print
* @see app/Http/Controllers/RollcallController.php:156
* @route '/rollcall/print'
*/
print.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: print.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RollcallController::print
* @see app/Http/Controllers/RollcallController.php:156
* @route '/rollcall/print'
*/
const printForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: print.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RollcallController::print
* @see app/Http/Controllers/RollcallController.php:156
* @route '/rollcall/print'
*/
printForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: print.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RollcallController::print
* @see app/Http/Controllers/RollcallController.php:156
* @route '/rollcall/print'
*/
printForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: print.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

print.form = printForm

const RollcallController = { index, store, update, destroy, storeGrade, storeBus, print }

export default RollcallController