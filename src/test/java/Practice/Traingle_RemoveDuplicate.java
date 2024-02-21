package Practice;

public class Traingle_RemoveDuplicate {

	public static void main(String[] args) {
		//String s= "automation Testing Swamy";
		String s="SwamyS";
		char[] c=s.toCharArray();
		for(int i=0;i<s.length();i++) {
			int flag=0;
			for(int j=0;j<i;j++) {
				System.out.println("i value: "+i);
				System.out.println("j value: "+j);
				if(c[i]==c[j]) {
				 flag=1;	
				}
			}
			if(flag==0)
			{
				System.out.print(c[i]);
			}
			
	}

}
}
