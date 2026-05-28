import { useEffect, type RefObject } from "react"

interface UseClickOutsideParams {
	refs: Array<RefObject<HTMLElement | null>>
	onOutsideClick: () => void
	enabled?: boolean
}

export const useClickOutside = ({
	refs,
	onOutsideClick,
	enabled = true,
}: UseClickOutsideParams) => {
	useEffect(() => {
		if (!enabled) return

		const handlePointerDownOutside = (event: MouseEvent) => {
			const target = event.target as Node
			const clickedInsideSomeRef = refs.some((ref) =>
				ref.current?.contains(target),
			)

			if (!clickedInsideSomeRef) {
				onOutsideClick()
			}
		}

		document.addEventListener("mousedown", handlePointerDownOutside)

		return () => {
			document.removeEventListener("mousedown", handlePointerDownOutside)
		}
	}, [refs, onOutsideClick, enabled])
}
