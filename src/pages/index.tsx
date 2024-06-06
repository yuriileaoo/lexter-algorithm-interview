import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'
import type { Content, OnChangeStatus } from 'vanilla-jsoneditor'
import { useForm } from "react-hook-form";
import { FETCH_CONFIG } from "@/pages/api/fetch_config";
import { Input } from '@/types/Input';
import Head from 'next/head';

const Loading = dynamic(() => import('@/components/Loading'), {})
const JSONEditorReact = dynamic(() => import('@/components/JSONEditorReact'), { ssr: false,
  loading: () => <Loading/>,
})
const Button = dynamic(() => import('@/components/Button'), {})

const initialContent = {}

export default function Home() {
  const [jsonContent, setJsonContent] = useState<Content>({ json: initialContent })
  const [resultContent, setResultContent] = useState<Content>({ json: {} })
  const [loading, setLoading] = useState<boolean>(false)
  const [submitError, setSubmitError] = useState<string>("")
  const { handleSubmit, formState } = useForm<Input>();

  const handler = useCallback(
    (content: Content, previousContent: Content, status: OnChangeStatus) => {
      setSubmitError("")
      setJsonContent(content)
    },
    [jsonContent]
  )

  async function onSubmit() {
    console.log(jsonContent)
    setSubmitError("")
    setLoading(true)
    return fetch("/api/mount/tree", FETCH_CONFIG("POST", jsonContent))
      .then((response) => response.json())
      .then((data) => {
          setResultContent({json: data})
          setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setSubmitError(err.message)
        setLoading(false)
      }
    )
  }

  return (
    <>
    <Head>
      <title>
      Lexter Algorithm Interview | Yuri Leão
      </title>
    </Head>
    <div className=" flex flex-col justify-start bg-background-default h-screen p-12">
      <h1 className="text-white-default font-bold text-3xl text-center">Lexter Algorithm Interview | Yuri Leão</h1>
      <div className="flex jsutify-center gap-12 p-12 ">
        <div className="w-full h-full max-h-full json-theme">
          <JSONEditorReact content={jsonContent} onChange={handler} onError={(e) => console.log(e)} mode="text" />
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center mt-4 m-2">
              <Button
                variant="primary"
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                >
                  <h1 className="text-md font-semibold text-right px-2">
                    MODIFICAR {">>"}
                  </h1>
              </Button>
            </div>
            {submitError &&
              <span className="text-[red] text-xs border border-[red] rounded p-2">{submitError}</span>
            }
          </div>
        </div>
        <div className="w-full h-full max-h-full json-theme">
          <JSONEditorReact content={resultContent} onChange={handler} readOnly={true}/>
        </div>
      </div>
      <div className='absolute bottom-20 '>
      </div>
   </div>
   </>  
   )
}


