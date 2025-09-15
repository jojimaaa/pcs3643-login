import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues } from "react-hook-form";

const CustomFormInput = (props :
    {
        className? : string | undefined,
        control : Control<any, any, any>,
        label : string,
        field : string,
        size : string,
        placeHolder : string,

    }
) => {
    return (<div className = {props.className}>
        <FormField
              control={props.control}
              name={props.field}
              render={({ field }) => (
                  <FormItem>
                    <div
                      className={props.size}
                    >
                      <FormLabel>{props.label}</FormLabel>
                      <FormControl>
                          <Input placeholder={props.placeHolder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
              )}
            />

    </div>);
}

export default CustomFormInput;