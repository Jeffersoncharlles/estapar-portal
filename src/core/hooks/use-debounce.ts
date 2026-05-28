import { useEffect, useRef } from "react"

export function useDebounceFn<T extends (...args: any[]) => void>(
	callback: T,
	delay: number,
) {
	const callbackRef = useRef(callback)
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current)
		}
	}, [])

	const debouncedFn = (...args: Parameters<T>) => {
		if (timerRef.current) {
			clearTimeout(timerRef.current)
		}

		timerRef.current = setTimeout(() => {
			callbackRef.current(...args)
		}, delay)
	}

	return debouncedFn
}
