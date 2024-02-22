import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IPost } from "./posts"

function post({ post }: { post: IPost }) {
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Id - {post.id}</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 ">
                <img src="https://picsum.photos/300/200" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
              </div>
            </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>Created By {post.firstName}</div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default post