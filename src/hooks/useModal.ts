import { useLayoutStore } from '../store/layout'

export default function useModal() {
  const { layout, setModalOpen } = useLayoutStore()

  const openSettingsModal = () => setModalOpen({ name: 'settings', value: true })
  const closeSettingsModal = () => setModalOpen({ name: 'settings', value: false })

  const openHubModal = () => setModalOpen({ name: 'hub', value: true })
  const closeHubModal = () => setModalOpen({ name: 'hub', value: false })

  const openNewDocumentModal = () => setModalOpen({ name: 'newDocument', value: true })
  const closeNewDocumentModal = () => setModalOpen({ name: 'newDocument', value: false })

  const openExportModal = () => setModalOpen({ name: 'export', value: true })
  const closeExportModal = () => setModalOpen({ name: 'export', value: false })

  const openCommandsModal = () => setModalOpen({ name: 'commands', value: true })
  const closeCommandsModal = () => setModalOpen({ name: 'commands', value: false })

  const openTermsModal = () => setModalOpen({ name: 'terms', value: true })
  const closeTermsModal = () => setModalOpen({ name: 'terms', value: false })

  const openNewFileModal = () => setModalOpen({ name: 'newFile', value: true })
  const closeNewFileModal = () => setModalOpen({ name: 'newFile', value: false })

  const openSearchModal = () => setModalOpen({ name: 'search', value: true })
  const closeSearchModal = () => setModalOpen({ name: 'search', value: false })

  return ({
    isOpenedSettingsModal: layout.modal.open.settings,
    isOpenedHubModal: layout.modal.open.hub,
    isOpenedNewDocumentModal: layout.modal.open.newDocument,
    isOpenedExportModal: layout.modal.open.export,
    isOpenedCommandsModal: layout.modal.open.commands,
    isOpenedTermsModal: layout.modal.open.terms,
    isOpeneNewFileModal: layout.modal.open.newFile,
    isOpeneSearchModal: layout.modal.open.search,

    openSettingsModal,
    openHubModal,
    openNewDocumentModal,
    openExportModal,
    openCommandsModal,
    openTermsModal,
    openNewFileModal,
    openSearchModal,

    closeSettingsModal,
    closeHubModal,
    closeNewDocumentModal,
    closeExportModal,
    closeCommandsModal,
    closeTermsModal,
    closeNewFileModal,
    closeSearchModal,
  })
}