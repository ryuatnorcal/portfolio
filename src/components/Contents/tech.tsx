import Image from "next/image";
import html from '../../../public/icons/icons8-html.svg'
import css from '../../../public/icons/icons8-css.svg'
import react from '../../../public/icons/icons8-react-native.svg'
import ts from '../../../public/icons/icons8-typescript.svg'
import js from '../../../public/icons/icons8-javascript.svg'
export const Tech = () => {
  return (
    <div className="flex flex-col justify-start w-10/12 md:w-8/12 lg:w-6/12 pb-10p">
      <h1 className="text-4xl font-bold tracking-md mb-5 underline">TECH STACK</h1>
      <div className="grid grid-cols-1 text-xl items-center flex tracking-sm leading-relaxed mt-5 mb-5">
        <h3 className="text-2xl font-bold">Frontend</h3>
        <div className="flex justify-around flex-wrap items-center mt-5 mb-5">
          <div className="flex flex-col items-center justify-center">
            <Image src={react} alt='react'/>
            <p className="text-sm text-center">React/React Native</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src={ts} alt='typescript'/>
            <p className="text-sm text-center">Typescript</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src={js} alt='javascript'/>
            <p className="text-sm text-center">JavaScript</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src={html} alt='html'/>
            <p className="text-sm text-center">HTML</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src={css} alt="css"/>
            <p className="text-sm text-center">CSS</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 text-xl items-center flex tracking-sm leading-relaxed">
        <h3 className="text-2xl font-bold">Backend</h3>
        <div className="flex justify-around flex-wrap items-center mt-5 mb-5">
          <div className="flex flex-col items-center justify-center">
            <Image src={react} alt='react'/>
            <p className="text-sm text-center">React/React Native</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src={ts} alt='typescript'/>
            <p className="text-sm text-center">Typescript</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src={js} alt='javascript'/>
            <p className="text-sm text-center">JavaScript</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src={html} alt='html'/>
            <p className="text-sm text-center">HTML</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src={css} alt="css"/>
            <p className="text-sm text-center">CSS</p>
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-1 text-xl items-center flex justify-end tracking-sm leading-relaxed">
        <h3 className="text-2xl font-bold">Tools</h3>
        <div className="flex justify-around flex-wrap items-center mt-5 mb-5">
          <div className="flex flex-col items-center justify-center">
            <Image src={react} alt='react'/>
            <p className="text-sm text-center">React/React Native</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src={ts} alt='typescript'/>
            <p className="text-sm text-center">Typescript</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src={js} alt='javascript'/>
            <p className="text-sm text-center">JavaScript</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src={html} alt='html'/>
            <p className="text-sm text-center">HTML</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src={css} alt="css"/>
            <p className="text-sm text-center">CSS</p>
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-1 text-xl items-center flex justify-end tracking-sm leading-relaxed">
        <h3 className="text-2xl font-bold">DevOps</h3>
        <div className="flex justify-around flex-wrap items-center mt-5 mb-5">
          <div className="flex flex-col items-center justify-center">
            <Image src={react} alt='react'/>
            <p className="text-sm text-center">React/React Native</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src={ts} alt='typescript'/>
            <p className="text-sm text-center">Typescript</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src={js} alt='javascript'/>
            <p className="text-sm text-center">JavaScript</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src={html} alt='html'/>
            <p className="text-sm text-center">HTML</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src={css} alt="css"/>
            <p className="text-sm text-center">CSS</p>
          </div>
        </div>
      </div>
    </div>
  )
}