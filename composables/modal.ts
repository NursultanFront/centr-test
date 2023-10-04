// TODO: реализовать более быстрый и удобный способ работы с модалоками
export const useModal = () => {};
// <const T extends string>(modalKeyList: T[]) => {
// type ModalKey = (typeof modalKeyList)[number];
// const get = (key: ModalKey) => {
//   const fullKey = `modal-${key}`;
//   const modal = document.getElementById(fullKey) as HTMLDialogElement;
//   if (!modal) {
//     throw new Error(`Modal with id ${key} is not found`);
//   }
//   return modal;
// };
// const open = (key: ModalKey) => get(key).showModal();
// const close = (key: ModalKey) => get(key).close();
// return { getModal: get, openModal: open, closeModal: close };
// };
